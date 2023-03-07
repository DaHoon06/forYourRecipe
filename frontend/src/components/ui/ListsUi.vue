<template>
  <article class="list__layout scroll">
    <article class="list__container">
      <div class="list-img--wrapper" @click.once="recipeDetail">
        <img :src="listItem.profileImage" width="284" height="177" alt="음식 이미지" loading="lazy"/>
      </div>
      <section class="list__body w-100" @click.once="recipeDetail">
        <text-font size="16" class="recipe--title">{{ listItem.name }}</text-font>
        <text-font size="12" color="placeholder" class="recipe--description">{{ listItem.desc }}</text-font>
        <figure class="recipe-like--wrapper">
          <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
          <figcaption>
            <text-font size="14">{{ listItem.likes.length }}</text-font>
          </figcaption>
        </figure>
        <div class="tags--wrapper mt-6">
          <span v-for="ingredient of listItem.detailedIngredient" :key="ingredient._id"
                class="tags mr-4">{{ ingredient.name }}</span>
        </div>
      </section>
      <hearts-icon :like="favorite" @click.once="favoriteRecipe(listItem._id)"/>
    </article>
  </article>
</template>

<script lang="ts">
import HeartsIcon from "@/components/icons/HeartsIcon.vue";
import {useStore} from "vuex";
import {ins} from "@/lib/axios";
import {computed, defineComponent} from "vue";
import {Recipe} from "@/interfaces/recipe";

interface Props {
  listItem: Recipe.Info,
  recipeDetail?: (payload: string) => void;
}

export default defineComponent({
  props: ['listItem', 'recipeDetail'],
  components: {
    HeartsIcon
  },
  setup(props: Props) {
    const store = useStore();
    const favoriteLists = computed(() => store.getters["userModule/getFavoriteRecipe"]);

    const favoriteRecipe = async (id: string) => {
      try {
        const user = store.getters["userModule/getUid"];
        if (user) {
          const body = {
            id,
            user
          }
          const {data} = await ins.patch('/recipes/update-like', body);
          store.commit("userModule/setFavoriteLists", data);
        } else {
          alert('로그인 해롸~')
        }
      } catch (e) {
        console.log(e)
      }
    }

    const favorite = computed(() => favoriteLists.value.indexOf(props.listItem._id) > -1);
    return {
      favoriteLists,
      favoriteRecipe,
      favorite,
      ...props,
    }
  }
})
</script>

<style scoped lang="scss">
.list__layout {
  display: none;
  border-bottom: 1px solid $line;
  width: 100%;
  max-height: 160px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .list__container {
    display: flex;
    padding: 1rem;
  }

  .list-img--wrapper {
    width: 124px;
    height: auto;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
      max-height: 96px;
      border-radius: 8px;
      background-repeat: no-repeat;
    }
  }

  .list__body {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .recipe--title {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1;
      max-height: 30px;
      height: auto;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .recipe--description {
      margin-top: 6px;
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1.2;
      height: 1em;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .recipe-like--wrapper {
      display: flex;
      align-items: center;
      margin-top: 6px;
    }
  }


  &:hover {
    border-color: rgba(130, 130, 130, 0.4);
    cursor: pointer;
    -webkit-filter: brightness(95%);
    filter: brightness(95%);
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 0;
  }
}

@media screen and (max-width: 600px) {
  .list__layout {
    display: inline-block;
  }
}
</style>
