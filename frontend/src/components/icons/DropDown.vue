<template>
  <span>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z" :fill="props.color"/>
    </svg>
  </span>
</template>

<script lang="ts" setup>
import {defineProps, withDefaults} from "vue";

interface Props {
  color: Color,
}

enum Color {
  black = '#343434',
  white = '#ffffff',
}

const props = withDefaults(defineProps<Props>(), {
  color: '#343434'
});

// const props = withDefaults(defineProps<Props>(), {
//   color: Color["black"]
// });
</script>

<style scoped lang="scss">

</style>