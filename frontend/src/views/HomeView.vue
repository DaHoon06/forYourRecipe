<template>
  <main class="main">

    <section class="w-100">
      <IngredientsBox/>
    </section>

    <section class="main__body">
      <section class="main__body--container">
        <text-font color="black" size="24" weight="bold">오늘의 추천 요리</text-font>
        <hr/>
        <section class="card--wrapper">
          <CardUi class="mr-20" v-for="(dish) in recipeCards" :key="dish._id" @click="recipeDetail(dish._id)">
            <text-font size="14">{{ dish.name }}</text-font>
          </CardUi>
        </section>
      </section>
    </section>


  </main>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Modal from "@/components/common/Modal.vue";
import CardUi from "@/components/CardUi.vue";
import Button from "@/components/common/Button.vue";
import IngredientsBox from "@/components/IngredientsBox.vue";
import {ins} from "@/lib/axios";

interface ISteps {
  _id: string,
  step: number,
  desc: string,
}

interface IRecipe {
  _id: string,
  name: string,
  ingredients: string[],
  createdAt: Date,
  updatedAt: Date,
  modified: boolean,
  user: string,
  steps: ISteps[]
}


@Options({
  components: {
    Button,
    Modal,
    CardUi,
    IngredientsBox
  }
})
export default class HomeView extends Vue {

  recipeCards: IRecipe[] = [];

  created() {
    this.load();
  }

  private async load() {
    try {
      const {data} = await ins.get('/recipes/all-recipes');
      console.log(data)
      this.recipeCards = data;
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
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  height: 100%;
}

.main__body {
  width: 100%;
  max-width: 1980px;
  padding: 10px 20px;
  height: 100%;


  &--container {
    padding: 2rem;

    .card--wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      justify-items: center;
      row-gap: 1rem;
    }
  }


}
</style>