<template>
  <Transition name="slide-fade">
    <aside class="side-menu" v-show="open" @click="outerClickCheck">
      <nav class="side-menu--items" ref="sideMenu">
        <section class="side-menu--top">
          <section v-if="!isLogin">

            <text-font class="center pb-32">
              로그인을 하면 <br/> 나만의 레시피를 등록할 수 있어요!
            </text-font>

            <div class="flex justify-center">
              <custom-button type="button" variant="black" @click="login">
                <text-font color="white" type="eng" class="pr-8">Login with</text-font>
                <img src="@/assets/images/icons/google.svg" alt="구글 로그인 버튼" width="22" height="22" loading="eager"/>
              </custom-button>
            </div>
          </section>
          <section v-else>
            <section class="profile--container pb-32">
              <img loading="lazy" :src="userProfile"
                   alt="프로필 이미지" width="96" height="96"/>
              <text-font class="pt-18">{{ userName }}</text-font>
            </section>

            <div class="flex align-center">
              <custom-button type="button" variant="icon-button">
                <text-font>마이페이지</text-font>
              </custom-button>
              <span class="division-line">|</span>
              <custom-button type="button" variant="icon-button" @click="logout">
                <text-font color="placeholder">로그아웃</text-font>
              </custom-button>
            </div>
          </section>
        </section>

        <hr/>

        <ul class="side-menu--bottom scroll">
          <li>
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('home')">
                <text-font class="w-100 text-left" color="textBody">메인</text-font>
              </custom-button>
            </div>
          </li>
          <li>
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('all-recipe')">
                <text-font class="w-100 text-left" color="textBody">레시피</text-font>
              </custom-button>
            </div>
          </li>
          <li v-if="isLogin">
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('recipe')">
                <text-font class="w-100 text-left" color="textBody">레시피 등록</text-font>
              </custom-button>
            </div>
          </li>
          <li v-if="isLogin">
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('favorite')">
                <text-font class="w-100 text-left" color="textBody">즐겨찾기</text-font>
              </custom-button>
            </div>
          </li>
          <!--          <li>-->
          <!--            <div class="w-100 text-right">-->
          <!--              <custom-button class="side-menu&#45;&#45;button" variant="" @click="redirect('notice')">-->
          <!--                <text-font class="w-100 text-left" color="textBody">공지사항</text-font>-->
          <!--              </custom-button>-->
          <!--            </div>-->
          <!--          </li>-->
        </ul>
      </nav>
    </aside>
  </Transition>
</template>

<script lang="ts" setup>
import {NAVIGATION} from "@/constant/navigation.href";
import {useStore} from "vuex";
import {authService} from "@/lib/fbase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {computed, ComputedRef, defineProps, ref, watch, withDefaults, defineEmits} from "vue";
import {useRouter} from "vue-router";

const props = withDefaults(defineProps<{ isOpen: boolean }>(), {isOpen: false})
const open = ref(false);

const isLogin: ComputedRef<boolean> = computed(() => store.getters["utilModule/isLogin"]);
const userName: ComputedRef<string> = computed(() => store.getters["userModule/getName"]);
const userProfile: ComputedRef<string> = computed(() => store.getters["userModule/getProfileImg"]);
const user: any = {} || null

const store = useStore();
const router = useRouter();

const sideMenu = ref(null);

watch(router, () => emit('closeMenu'));
watch(props, () => {
  open.value = props.isOpen
  const html = document.querySelector('html');
  if (html) props.isOpen ? html.style.overflow = 'hidden' : html.style.overflow = ''
});

const outerClickCheck = (e: Event) => {
  const target = e.target as HTMLElement
  const nav = sideMenu.value as HTMLElement;
  if (nav !== target && !nav.contains(target))
    emit('closeMenu');
}

const emit = defineEmits('closeMenu', () => {
  open.value = false
  return open;
})

const login = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(authService, provider)
  user.value = authService.currentUser
  if (user) {
    await store.dispatch('userModule/login', user);
    await store.commit("utilModule/setIsLogin", true);
  }
}

const logout = async () => {
  await authService.signOut()
  await store.commit("userModule/resetUserData");
  await store.commit('utilModule/setIsLogin', false);
}

const redirect = (type: string): void => {
  emit('closeMenu');
  switch (type) {
    case 'home':
      store.commit("utilModule/setCurrentPath", 0);
      router.push(NAVIGATION.HOME)
      break;
    case 'recipe':
      store.commit("utilModule/setCurrentPath", 1);
      router.push(NAVIGATION.RECIPE_POST_ADMIN)
      break;
    case 'favorite':
      store.commit("utilModule/setCurrentPath", 2);
      router.push(NAVIGATION.FAVORITE)
      break;
    case 'notice':
      store.commit("utilModule/setCurrentPath", 3);
      router.push(NAVIGATION.NOTICE)
      break;
    case 'all-recipe':
      store.commit("utilModule/setCurrentPath", 4);
      router.push(NAVIGATION.ALL_RECIPE)
      break;
    default:
      store.commit("utilModule/setCurrentPath", 0);
      router.push(NAVIGATION.HOME)
      break;
  }
}
</script>

<style scoped lang="scss">
hr {
  margin: 0;
  border: none;
  background-color: $line;
  height: 1px;
}

.side-menu {
  background-color: rgba(233, 233, 233, 0.44);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  width: 100%;
  min-height: 100%;
  height: auto;
  position: fixed;
  right: 0;
  z-index: 99;
  top: 90px;

  &--items {
    background-color: $white;
    position: absolute;
    right: 0;
    top: 0;
    width: 250px;
    height: 100%;
  }

  .side-menu--top {
    width: 100%;
    height: 254px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .division-line {
      color: $line;
      margin: 0 20px;
    }
  }

  .side-menu--bottom {

    .side-menu--button {
      width: 100%;
      border-bottom: 1px solid $line;

      p {
        padding: 1rem;
      }

      &:hover {
        border-color: $black;

        p {
          color: $black;
          font-weight: 700;
        }
      }
    }

    li {
      display: flex;
      justify-content: flex-end;
    }

    .side-menu--item {
      background-color: $gray3;
      max-width: 256px;
      max-height: 65px;
      height: auto;
      padding: 1rem 0;
      width: 256px;
      border-radius: 40px 0 0 40px;
      border: 1px solid $line;
      display: flex;
      align-items: center;


      .icon {
        max-width: 32px;
        max-height: 32px;
        width: 4vw;
        height: auto;
      }
    }
  }

  /* 로그인 후 */
  .profile--container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

}

.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
