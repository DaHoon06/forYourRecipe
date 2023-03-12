<template>
  <picture :class="props.selected ? 'disabled-icon' : 'ingredient-icon--wrapper'">
    <img :src="props.src"
         sizes="(max-width: 32px)" decoding="async" alt="식재료" width="32" height="32"/>
  </picture>
  <text-font class="pt-10" size="12">
    {{ props.label }}
  </text-font>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

interface Props {
  src?: string,
  label?: string,
  selected?: boolean,
}

const props = defineProps<Props>();
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

/* 재료 아이콘 선택 표시 */
.disabled-icon {
  -webkit-filter: brightness(95%);
  filter: brightness(95%);
  background-color: rgba(240, 240, 240, 0.6);
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    -webkit-filter: brightness(90%);
    filter: brightness(90%);
  }
}
</style>
