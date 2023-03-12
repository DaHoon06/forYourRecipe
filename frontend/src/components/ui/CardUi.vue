<template>
  <article class="card__layout--container">
    <article class="card__layout scroll">
      <div @click.once="recipeDetail">
        <img :src="cardItem.profileImage" width="284" height="200" alt="음식 이미지" loading="lazy"/>
      </div>
      <section class="card__body">
        <section class="card-ui__body">
          <text-font size="18" class="recipe--title" @click.once="recipeDetail">{{ cardItem.name }}</text-font>
          <text-font size="14" color="placeholder" class="recipe--description" @click.once="recipeDetail">
            {{ cardItem.desc }}
          </text-font>
          <figure class="recipe-like--wrapper">
            <hearts-icon :like="favorite" @click="favoriteRecipe(cardItem._id)" class="mr-8"/>

            <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
            <figcaption>
              <text-font size="14">{{ cardItem.likes.length }}</text-font>
            </figcaption>
          </figure>
          <div class="tags--wrapper w-100 mt-10" @click.once="recipeDetail">
            <span v-for="ingredient of cardItem.detailedIngredient" :key="ingredient._id"
                  class="tags mr-4">{{ ingredient.name }}</span>
          </div>
        </section>
      </section>
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
  cardItem: Recipe.Info,
  recipeDetail?: (payload: string) => void;
}

export default defineComponent({
  props: ['cardItem', 'recipeDetail'],
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

    const favorite = computed<boolean>(() => favoriteLists.value.indexOf(props.cardItem._id) > -1);
    return {
      favoriteLists,
      favoriteRecipe,
      favorite,
      ...props,
    }
  }
})
</script>

<style lang="scss" scoped>
.card__layout--container {
  display: flex;
  justify-content: center;
}

.card__layout {
  display: inline-block;
  border: 1px solid $line;
  width: 284px;
  height: 350px;
  overflow: hidden;

  .card__body {
    padding: 8px 12px;
    max-height: 146px;
    height: 100%;

    .card-ui__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;

      .recipe--title {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        line-height: 1.2;
        height: 44px;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .recipe--description {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        line-height: 1.2;
        height: 1.2em;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .recipe-like--wrapper {
        display: flex;
        align-items: center;
        padding-top: 10px;
      }
    }
  }

  img {
    width: 100%;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
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

@media screen and (max-width: 727px) {
  .card__layout--container {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 600px) {
  .card__layout {
    display: none;
  }
}
</style>
