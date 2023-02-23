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
              <custom-button type="button" variant="icon-button" @click="login">
                <text-font>로그인</text-font>
              </custom-button>
              <span class="division-line">|</span>
              <custom-button type="button" variant="icon-button">
                <text-font>회원가입</text-font>
              </custom-button>
            </div>
          </section>
          <section v-else>
            <section class="profile--container pb-32">
              <img loading="lazy" src="@/assets/images/icons/profile.svg" alt="프로필 이미지" width="96" height="96"/>
              <text-font class="pt-18">{{user.displayName}}</text-font>
            </section>

            <div class="flex">
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
            <custom-button type="button" variant="icon-button" @click="redirect('home')">
              <div class="side-menu--item">
                <img loading="eager" src="@/assets/images/icons/home.svg" alt="메인으로 이동" width="32" height="32"
                     class="ml-40 mr-26 icon"/>
                <text-font color="textBody">메인</text-font>
              </div>
            </custom-button>
          </li>
          <li>
            <!-- TODO: 레시피 등록 화면 1. 관리자, 2. 회원 -->
            <custom-button type="button" variant="icon-button" @click="redirect('recipe')">
              <div class="side-menu--item">
                <img loading="eager" src="@/assets/images/icons/register.svg" alt="레시피 등록" width="32" height="32"
                     class="ml-40 mr-26 icon"/>
                <text-font color="textBody">레시피 등록</text-font>
              </div>
            </custom-button>
          </li>
          <li>
            <custom-button type="button" variant="icon-button" @click="redirect('favorite')">
              <div class="side-menu--item">
                <img loading="eager" src="@/assets/images/icons/star.svg" alt="즐겨찾기" width="32" height="32"
                     class="ml-40 mr-26 icon"/>
                <text-font color="textBody">즐겨찾기</text-font>
              </div>
            </custom-button>
          </li>
          <li>
            <custom-button type="button" variant="icon-button" @click="redirect('notice')">
              <div class="side-menu--item">
                <img loading="eager" src="@/assets/images/icons/question.svg" alt="공지사항" width="32" height="32"
                     class="ml-40 mr-26 icon"/>
                <text-font color="textBody">공지사항</text-font>
              </div>
            </custom-button>
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

// TODO: 모바일 화면에서만 햄버거 버튼
export default class SideMenu extends Vue {
  @Prop({default: false}) isOpen!: boolean;

  private outerClickCheck(e: Event) {
    const target = e.target as HTMLElement
    const nav = this.$refs.sideMenu as HTMLElement;
    if (nav !== target && !nav.contains(target))
      this.closeMenu();
  }

  open = false;
  // Temp
  isLogin = false
  store = useStore();

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

  user: any = {}

  private async login() {
    const provider = new GoogleAuthProvider()
    const data = await signInWithPopup(authService, provider)
    console.log(data)
    this.user = authService.currentUser
    this.isLogin = true;
  }

  private logout() {
    authService.signOut()
    this.user = authService.currentUser
    this.isLogin = false;
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
  top: 63px;

  &--items {
    background-color: $white;
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
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

    li {
      display: flex;
      justify-content: flex-end;
      padding: 16px 0;
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
