<template>
  <header class="header">
    <section class="wrapper">
      <custom-button variant="icon-button" type="button" @click="redirectHome">
        <h1 style="font-size: 22px; margin-left: 20px">FAST FIND FAST COOK</h1>
<!--        <img loading="eager" width="30" height="30" src="@/assets/images/icons/cook.svg" alt="로고">-->
      </custom-button>
      <section class="header--side">
        <search-input/>
        <custom-button variant="icon-button" class="flex align-center" @click="login" v-if="!isLogin">
<!--          <text-font color="white" class="pr-6">Login</text-font>-->
<!--          <text-font color="white" class="pr-8">with</text-font>-->
<!--          <img src="@/assets/images/icons/google.svg" alt="구글 로그인 버튼" width="22" height="22" loading="eager"/>-->
          <text-font color="black" class="pr-6">Login</text-font>
          <text-font color="black" class="pr-8">with</text-font>
          <img src="@/assets/images/icons/google-black.svg" alt="구글 로그인 버튼" width="22" height="22" loading="eager"/>
        </custom-button>
        <custom-button type="button" variant="icon-button" @click="logout" v-else>
          <text-font color="white">Logout</text-font>
        </custom-button>

      </section>
      <section class="hamburger--side">
        <custom-button type="button" variant="icon-button" @click="showSideMenu">
<!--          <img loading="eager" width="30" height="30" src="@/assets/images/icons/hamburger.svg" alt="햄버거 메뉴"/>-->
          <img loading="eager" width="30" height="30" src="@/assets/images/icons/hamburger-black.svg" alt="햄버거 메뉴"/>
        </custom-button>
        <side-menu :isOpen="isOpen" @closeMenu="closeMenu"/>
      </section>
    </section>
    <navigation-menu/>
  </header>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import SideMenu from "@/components/common/SideMenu.vue";
import SearchInput from "@/components/common/SearchInput.vue";
import NavigationMenu from "@/components/common/NavigationMenu.vue";
import {useStore} from "vuex";
import {NAVIGATION} from "@/constant/navigation.href";
import {authService} from "@/lib/fbase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {computed, ComputedRef} from "vue";

@Options({
  components: {
    SideMenu,
    NavigationMenu,
    SearchInput
  }
})
export default class Header extends Vue {
  isOpen = false;
  store = useStore();
  user: any = {}
  isLogin: ComputedRef<boolean> = computed(() => this.store.getters["utilModule/isLogin"]);

  private redirectHome(): void {
    this.store.commit("utilModule/setCurrentPath", 0);
    this.$router.push(NAVIGATION.HOME);
  }

  private async login() {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(authService, provider)
      this.user = authService.currentUser
      if (this.user) {
        await this.store.dispatch('userModule/login', this.user);
        this.store.commit("utilModule/setIsLogin", true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  private logout() {
    authService.signOut()
    this.store.commit("userModule/resetUserData");
    this.store.commit('utilModule/setIsLogin', false);
  }

  private closeMenu(payload: boolean): void {
    this.isOpen = payload;
  }

  private showSideMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
</script>

<style scoped lang="scss">
.header {
  background-color: $pointColor;
  width: 100%;
  //height: 64px;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  border-bottom: solid 1px #A3A3A3;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    height: 100%;
  }

  .header--side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    max-width: 400px;
  }

  .hamburger--side {
    display: none;
  }
}

@media screen and (max-width: 1080px) {
  .header {
    .header--side {
      width: 40vw;
    }
  }
}

@media screen and (max-width: 767px) {
  .header {
    .header--side {
      display: none;
    }

    .hamburger--side {
      display: inline-block;
    }
  }
}
</style>
