<template>
  <article class="box-container">
    <section>
      <img src="@/assets/images/refrigerator.webp" width="600" height="600" alt="냉장고"/>
    </section>
  </article>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class IngredientsBox extends Vue {

}
</script>

<style lang="scss" scoped>
.box-container {
  text-align: center;
  border: 1px solid $line;
  width: 100%;
  height: auto;
}
</style>