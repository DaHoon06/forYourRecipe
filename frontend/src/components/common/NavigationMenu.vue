<template>
  <nav class="navigation">
    <ul>
      <li :class="currentMenu === 4 && 'current-path'" class="mr-30">
        <custom-button variant="icon-button" type="button" @click="redirect('all-recipe')">
          <text-font :color="currentMenu === 4 ? 'black' : 'gray'" size="16">전체 레시피</text-font>
        </custom-button>
      </li>
      <li :class="currentMenu === 1 && 'current-path'" class="mr-30" v-if="isLogin">
        <custom-button variant="icon-button" type="button" @click="redirect('recipe')">
          <text-font :color="currentMenu === 1 ? 'black' : 'gray'" size="16">레시피 등록</text-font>
        </custom-button>
      </li>
      <li :class="currentMenu === 2 && 'current-path'" class="mr-30" v-if="isLogin">
        <custom-button variant="icon-button" type="button" @click="redirect('favorite')">
          <text-font :color="currentMenu === 2 ? 'black' : 'gray'" size="16">즐겨찾기</text-font>
        </custom-button>
      </li>
      <!--      <li :class="currentMenu === 3 && 'current-path'">-->
      <!--        <custom-button :disabled="true" variant="icon-button" type="button" @click="redirect('notice')">-->
      <!--          <text-font color="black" size="16">공지사항</text-font>-->
      <!--        </custom-button>-->
      <!--      </li>-->
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import {NAVIGATION} from "@/constant/navigation.href";
import {computed, ComputedRef} from "vue";
import store from '@/store';
import {useRouter} from "vue-router";

const router = useRouter();
const currentMenu: ComputedRef<number> = computed(() => store.getters["utilModule/currentPath"]);
const isLogin: ComputedRef<boolean> = computed(() => store.getters["utilModule/isLogin"]);

const redirect = (type: string): void => {
  switch (type) {
    case 'home':
      store.commit("utilModule/setCurrentPath", 0);
      router.push(NAVIGATION.HOME)
      break;
    case 'recipe':
      store.commit("utilModule/setCurrentPath", 1);
      router.push(NAVIGATION.RECIPE_POST)
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
    padding: 0 0.5em 0.5em 0;
    border-bottom: 2px solid transparent;

    button p {
      color: $line;

      &:hover {
        color: $gray1;
      }
    }

  }

  .current-path {
    border-color: $primary;

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
