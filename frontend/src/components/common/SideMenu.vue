<template>
  <Transition name="slide-fade">
    <aside class="side-menu" v-show="open">
      <nav class="side-menu--items">
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
              <text-font class="pt-18">전다훈</text-font>
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

export default class SideMenu extends Vue {
  @Prop({default: false}) isOpen!: boolean;

  open = false;
  // Temp
  isLogin = false

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

  private login() {
    this.isLogin = true;
  }

  private logout() {
    this.isLogin = false;
  }

  private redirect(type: string) {
    this.closeMenu();
    switch (type) {
      case 'home':
        this.$router.push('/')
        break;
      case 'recipe':
        this.$router.push('/recipe/post')
        break;
      case 'favorite':
        this.$router.push('/')
        break;
      case 'notice':
        this.$router.push('/')
        break;
      default:
        this.$router.push('/')
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
