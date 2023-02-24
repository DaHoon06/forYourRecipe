<template>
  <main class="main">
    <loading-spinner v-if="isLoading"/>

    <section class="main__top">
      <IngredientsBox/>
    </section>

    <section class="main__body">
      <section class="main__body--container">
        <text-font class="today-recommended-dishes" color="black" size="24">오늘의 추천 요리</text-font>
        <hr/>
        <section class="card--wrapper">
          <CardUi class="mr-20" v-for="(dish) in recipeCards" :src="dish.profileImage" :key="dish._id"
                  @click="recipeDetail(dish._id)">
            <section class="card-ui__body">
              <text-font size="18">{{ dish.name }}</text-font>
              <text-font size="14" color="placeholder">{{ dish.desc }}</text-font>
              <figure class="recipe-like--wrapper">
                <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
                <figcaption>
                  <text-font size="14">{{ dish.likes.length }}</text-font>
                </figcaption>
              </figure>

              <div class="flex">
                <span v-for="i of 4" :key="i" class="tags mr-4">{{ i }}</span>
              </div>
            </section>
          </CardUi>
          <ListsUi v-for="(dish) in recipeCards" :src="dish.profileImage" :key="dish._id"
                   @click="recipeDetail(dish._id)">
            <text-font size="18">{{ dish.name }}</text-font>
            <text-font size="14" color="placeholder">{{ dish.desc }}</text-font>
            <figure class="recipe-like--wrapper">
              <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
              <figcaption>
                <text-font size="14">{{ dish.likes.length }}</text-font>
              </figcaption>
            </figure>
            <div class="flex">
              <span v-for="i of 4" :key="i" class="tags mr-4">{{ i }}</span>
            </div>
          </ListsUi>
        </section>
      </section>
    </section>


  </main>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Modal from "@/components/common/Modal.vue";
import CardUi from "@/components/ui/CardUi.vue";
import Button from "@/components/common/Button.vue";
import IngredientsBox from "@/components/IngredientsBox.vue";
import {ins} from "@/lib/axios";
import ListsUi from "@/components/ui/ListsUi.vue";
import {Recipe} from "@/interfaces/recipe";

@Options({
  components: {
    ListsUi,
    Button,
    Modal,
    CardUi,
    IngredientsBox
  }
})
export default class HomeView extends Vue {
  isLoading = true;
  recipeCards: Recipe.Info[] = [];

  created() {
    this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get('/recipes/random-recipes');
      this.recipeCards = data;
      this.isLoading = false;
    } catch (e) {
      console.log(e)
    }
  }

  private recipeDetail(id: string) {
    this.$router.push(`/recipe/detail/${id}`)
  }
}
</script>

<style scoped lang="scss">
hr {
  margin: 0;
  border-color: #A3A3A3;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  height: 100%;

  .main__top {
    width: 100%;
  }
}


.main__body {
  width: 100%;
  max-width: 1980px;
  padding: 10px 20px;
  height: 100%;


  &--container {
    padding: 2rem;

    .today-recommended-dishes {
      padding-bottom: 1rem;
    }

    .card--wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      justify-items: center;
      row-gap: 1rem;
      margin-top: 70px; //새로 추가
    }
  }
}

@media screen and (max-width: 600px) {
  .main__body {
    padding: 0;

    &--container {
      padding: 0;

      .today-recommended-dishes {
        padding: 1rem;
      }

      .card--wrapper {
        margin-top: 0;
        row-gap: 0;
      }
    }
  }
}


</style>
