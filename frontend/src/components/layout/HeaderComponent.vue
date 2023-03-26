<template>
  <header class="header">
    <section class="wrapper">
      <custom-button variant="icon-button" type="button" class="flex-column-center text-left" @click="redirectHome">
        <text-font type="eng" class="w-100" color="primary" size="22" weight="semiBold">
          RECIPE
        </text-font>
        <text-font type="eng" class="w-100" color="primary" size="22" weight="semiBold">
          BOOKS
        </text-font>
      </custom-button>
      <section class="header-search--container">
        <search-input/>
        <div class="header--side">
          <custom-button variant="icon-button" class="flex align-center" @click="login" v-if="!state.isLogin">
            <text-font color="black" class="pr-6" type="eng">Login</text-font>
            <text-font color="black" class="pr-8" type="eng">with</text-font>
            <img src="@/assets/images/icons/google-black.svg" alt="구글 로그인 버튼" width="22" height="22" loading="eager"/>
          </custom-button>
          <div class="header-logout-box" v-else>
            <text-font size="14" color="black" weight="semiBold" class="pr-10">{{ state.userName }} 님</text-font>
            <custom-button type="button" variant="icon-button" @click="logout">
              <text-font color="placeholder">Logout</text-font>
            </custom-button>
          </div>
        </div>
        <div class="hamburger--side">
          <custom-button type="button" variant="icon-button" @click="showSideMenu">
            <img loading="eager" width="30" height="30" src="@/assets/images/icons/hamburger-black.svg" alt="햄버거 메뉴"/>
          </custom-button>
          <side-menu :isOpen="state.isOpen" @closeMenu="closeMenu"/>
        </div>
      </section>
    </section>
    <navigation-menu/>
  </header>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {NAVIGATION} from "@/constant/navigation.href";
import {authService} from "@/lib/fbase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {computed, ComputedRef, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import NavigationMenu from "@/components/common/NavigationMenu.vue";
import SearchInput from "@/components/common/SearchInput.vue";
import SideMenu from "@/components/common/SideMenu.vue";

interface HeaderState {
  isOpen: boolean,
  user: any,
  isLogin: ComputedRef<boolean>,
  userName: ComputedRef<string>
}

const store = useStore();
const router = useRouter();

onMounted(() => {
  browserResizeCheck();
})

const state: HeaderState = reactive({
  isOpen: false,
  user: null,
  isLogin: computed(() => store.getters["utilModule/isLogin"]),
  userName: computed(() => store.getters["userModule/getName"]),
});

const redirectHome = (): void => {
  store.commit("utilModule/setCurrentPath", 0);
  router.push(NAVIGATION.HOME);
}

const browserResizeCheck = (): void => {
  const header = document.querySelector('.header');
  window.addEventListener('resize', () => {
    const width = header?.getBoundingClientRect().width;
    if (width && width >= 767 && state.isOpen) state.isOpen = !state.isOpen;
  })
}

const login = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider);
    state.user = authService.currentUser;
    if (state.user) {
      await store.dispatch('userModule/login', state.user);
      store.commit("utilModule/setIsLogin", true);
    }
  } catch (e) {
    console.log(e);
  }
}

const logout = (): void => {
  authService.signOut();
  store.commit("userModule/resetUserData");
  store.commit('utilModule/setIsLogin', false);
}

const closeMenu = (payload: boolean): void => {
  state.isOpen = payload;
}

const showSideMenu = (): void => {
  state.isOpen = !state.isOpen;
}
</script>


<style scoped lang="scss">

.header {
  background-color: $white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  border-bottom: #b3b3b3 solid 1px;

  h1 {
    font-size: 22px;
    display: grid;
    justify-items: start;
    color: #222222;
    font-weight: 700;
    font-family: $eng;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    max-width: 1980px;
    padding: 15px 52px 25px 52px;
    height: 100%;

    .header-search--container {
      display: flex;
      width: calc(100% - 150px);
      max-width: 1000px;
    }
  }

  .header--side {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .header-logout-box {
      width: fit-content;
      display: flex;
      align-items: center;
    }
  }

  .hamburger--side {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .header {

    .wrapper {
      padding: 15px;
    }

    .header--side {
      display: none;
    }

    .hamburger--side {
      display: inline-block;
    }
  }
}

</style>
