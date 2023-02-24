<template>
  <nav class="navigation">
    <ul>
      <li :class="currentMenu === 1 && 'current-path'">
        <custom-button variant="icon-button" type="button" @click="redirect('recipe')">
<!--          <text-font color="textTitle" size="18">레시피 등록</text-font>-->
          <text-font color="black" size="18">레시피 등록</text-font>
        </custom-button>
      </li>
      <li :class="currentMenu === 2 && 'current-path'">
        <custom-button variant="icon-button" type="button" @click="redirect('favorite')">
<!--          <text-font color="textTitle" size="18">즐겨찾기</text-font>-->
          <text-font color="black" size="18">즐겨찾기</text-font>
        </custom-button>
      </li>
      <li :class="currentMenu === 3 && 'current-path'">
        <custom-button variant="icon-button" type="button" @click="redirect('notice')">
<!--          <text-font color="textTitle" size="18">공지사항</text-font>-->
          <text-font color="black" size="18">공지사항</text-font>
        </custom-button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {NAVIGATION} from "@/constant/navigation.href";
import {computed, ComputedRef} from "vue";
import {useStore} from "vuex";

export default class NavigationMenu extends Vue {
  store = useStore();
  currentMenu: ComputedRef<number> = computed(() => this.store.getters["utilModule/currentPath"]);

  private redirect(type: string) {
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
        this.store.commit("utilModule/setCurrentPath", 4);
        this.$router.push(NAVIGATION.HOME)
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  //justify-content: center;
  align-items: center;
  width: 100%;
  height: 62px;
  //background-color: rgba(235, 235, 235, 0.6);
  background-color: white;
  //border-top: #A3A3A3 solid 1px;
  border-bottom: #A3A3A3 solid 1px;
  padding-left: 40px;

  ul {
    width: 900px;
    //margin: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  ul > li {
    float: left;
    border-bottom: 2px solid transparent;
    padding: 2px 10px;

    &:hover {
      //border-color: $pointColor;

      button p {
        color: $gray3;
      }
    }
  }

  .current-path {
    //border-color: $pointColor;
    border-color: $black;

    button p {
      color: $black;
    }
  }
}

@media screen and (max-width: 767px) {
  .navigation {
    display: none;
  }

}
</style>