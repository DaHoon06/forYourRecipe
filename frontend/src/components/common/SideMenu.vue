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
                <text-font>로그아웃</text-font>
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
            <!-- TODO: 레시피 등록 화면 1. 관리자, 2. 회원 -->
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('recipe')">
                <text-font class="w-100 text-left" color="textBody">레시피 등록</text-font>
              </custom-button>
            </div>
          </li>
          <li>
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('favorite')">
                <text-font class="w-100 text-left" color="textBody">즐겨찾기</text-font>
              </custom-button>
            </div>
          </li>
          <li>
            <div class="w-100 text-right">
              <custom-button class="side-menu--button" variant="" @click="redirect('notice')">
                <text-font class="w-100 text-left" color="textBody">공지사항</text-font>
              </custom-button>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  </Transition>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Emit, Prop, Watch} from "vue-property-decorator";
import {NAVIGATION} from "@/constant/navigation.href";
import {useStore} from "vuex";
import {authService} from "@/lib/fbase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {computed, ComputedRef} from "vue";

// TODO: 모바일 화면에서만 햄버거 버튼
export default class SideMenu extends Vue {
  @Prop({default: false}) isOpen!: boolean;

  open = false;
  isLogin: ComputedRef<boolean> = computed(() => this.store.getters["utilModule/isLogin"]);
  userName: ComputedRef<string> = computed(() => this.store.getters["userModule/getName"]);
  userProfile: ComputedRef<string> = computed(() => this.store.getters["userModule/getProfileImg"]) || '@/assets/images/icons/profile.svg';
  store = useStore();
  user: any = {}

  @Watch('$route')
  routeCheck() {
    this.closeMenu();
  }

  private outerClickCheck(e: Event) {
    const target = e.target as HTMLElement
    const nav = this.$refs.sideMenu as HTMLElement;
    if (nav !== target && !nav.contains(target))
      this.closeMenu();
  }

  @Watch('isOpen')
  private disabledScroll() {
    this.open = this.isOpen
    const html = document.querySelector('html');
    if (html) this.isOpen ? html.style.overflow = 'hidden' : html.style.overflow = ''
  }

  @Emit('closeMenu')
  closeMenu() {
    this.open = false
    return this.open;
  }

  private async login() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(authService, provider)
    this.user = authService.currentUser
    if (this.user) {
      await this.store.dispatch('userModule/login', this.user);
      await this.store.commit("utilModule/setIsLogin", true);
    }
  }

  private async logout() {
    await authService.signOut()
    await this.store.commit("userModule/resetUserData");
    await this.store.commit('utilModule/setIsLogin', false);
  }

  private redirect(type: string) {
    this.closeMenu();
    switch (type) {
      case 'home':
        this.store.commit("utilModule/setCurrentPath", 0);
        this.$router.push(NAVIGATION.HOME)
        break;
      case 'recipe':
        // TODO TEMP - ADMIN
        this.store.commit("utilModule/setCurrentPath", 1);
        this.$router.push(NAVIGATION.RECIPE_POST_ADMIN)
        break;
      case 'favorite':
        this.store.commit("utilModule/setCurrentPath", 2);
        this.$router.push(NAVIGATION.FAVORITE)
        break;
      case 'notice':
        this.store.commit("utilModule/setCurrentPath", 3);
        this.$router.push(NAVIGATION.NOTICE)
        break;
      default:
        this.store.commit("utilModule/setCurrentPath", 0);
        this.$router.push(NAVIGATION.HOME)
        break;
    }
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
      border-bottom: 1.5px solid $line;

      p{
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
      background-color: $gray4;
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
