<template>
  <picture class="ingredient-icon--wrapper">
    <img loading="lazy" :src="src"
         sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
  </picture>
  <text-font class="pt-10" size="12">
    {{ label }}
  </text-font>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

export default class IngredientIcon extends Vue {
  @Prop() src!: string;
  @Prop() label!: string;
}
</script>

<style scoped lang="scss">
.ingredient-icon--wrapper {
  border: 1px solid $line;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(245, 245, 245, 0.5);
  }
}
</style>