<template>
  <main class="main">

    <section class="w-100">
      <IngredientsBox/>
    </section>

    <section class="main__body">
      <text-font color="black" size="24" weight="bold">오늘의 추천 요리</text-font>
      <hr/>
      <section class="flex">
        <CardUi class="mr-20" v-for="(i) in 4" :key="i"/>
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


@Options({
  components: {
    Button,
    Modal,
    CardUi,
    IngredientsBox
  }
})
export default class HomeView extends Vue {

}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  min-height: 1000px;
}

.main__body {
  padding: 10px 20px;
}
</style>