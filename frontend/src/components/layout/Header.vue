<template>
  <header class="header">
    <section class="wrapper">
      <router-link to="/">
        <img loading="eager" width="30" height="30" src="@/assets/images/icons/cook.svg" alt="로고">
      </router-link>
      <section class="header--side">
        <search-input/>
        <text-font color="white">Login</text-font>
      </section>
      <section class="hamburger--side">
        <custom-button type="button" variant="icon-button" @click="showSideMenu">
          <img loading="eager" width="30" height="30" src="@/assets/images/icons/hamburger.svg" alt="햄버거 메뉴"/>
        </custom-button>
        <side-menu :isOpen="isOpen" @closeMenu="closeMenu"/>
      </section>
    </section>
  </header>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import SideMenu from "@/components/common/SideMenu.vue";
import SearchInput from "@/components/common/SearchInput.vue";

@Options({
  components: {
    SideMenu,
    SearchInput
  }
})
export default class Header extends Vue {
  isOpen = false;

  private closeMenu(payload: boolean) {
    this.isOpen = payload;
  }

  private showSideMenu() {
    this.isOpen = !this.isOpen;
  }
}
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid $line;
  background-color: $pointColor;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

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
