<template>
  <header class="header">
    <section class="wrapper">
      <router-link to="/">
        <img src="@/assets/images/icons/cook.svg" alt="로고">
      </router-link>

      <custom-button type="button" variant="icon-button" @click="showSideMenu">
        <img src="@/assets/images/icons/hamburger.svg" alt=""/>
      </custom-button>
    </section>
    <side-menu :isOpen="isOpen" @closeMenu="closeMenu"/>
  </header>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import SideMenu from "@/components/common/SideMenu.vue";

@Options({
  components: {
    SideMenu

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
  padding: 15px 20px;
  position: fixed;
  top: 0;

  .wrapper {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>