<template>
  <nav class="navigation">
    <ul>
      <li :class="currentMenu === 1 && 'current-path'" class="mr-30">
        <custom-button variant="icon-button" type="button" @click="redirect('recipe')">
          <text-font color="black" size="16">레시피 등록</text-font>
        </custom-button>
      </li>
      <li :class="currentMenu === 2 && 'current-path'" class="mr-30">
        <custom-button variant="icon-button" type="button" @click="redirect('favorite')">
          <text-font color="black" size="16">즐겨찾기</text-font>
        </custom-button>
      </li>
      <li :class="currentMenu === 3 && 'current-path'">
        <custom-button variant="icon-button" type="button" @click="redirect('notice')">
          <text-font color="black" size="16">공지사항</text-font>
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
  align-items: center;
  width: 100%;
  background-color: white;

  ul {
    max-width: 1980px;
    width: 100%;
    padding-left: 52px;
    margin: auto;
  }

  ul > li {
    float: left;
    padding: 0 10px 0.5em 0;
    border-bottom: 2px solid transparent;

    button p {
      color: $line;

      &:hover {
        color: $gray1;
      }
    }

  }

  .current-path {
    border-color: $black;

    button p {
      color: $black;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 767px) {
  .navigation {
    display: none;
  }

}
</style>
