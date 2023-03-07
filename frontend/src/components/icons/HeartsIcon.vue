<template>
  <div class="hearts">

    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.56916 18.2064L9.56847 18.2057C6.98433 15.6517 4.87742 13.5658 3.41075 11.6101C1.95055 9.663 1.16699 7.89822 1.16699 5.99455C1.16699 2.86207 3.40222 0.5 6.16699 0.5C7.73913 0.5 9.26954 1.30059 10.2742 2.57636L10.667 3.07522L11.0598 2.57636C12.0644 1.30059 13.5949 0.5 15.167 0.5C17.9318 0.5 20.167 2.86207 20.167 5.99455C20.167 7.89822 19.3834 9.663 17.9232 11.6101C16.4566 13.5658 14.3497 15.6517 11.7655 18.2057L11.7648 18.2064L10.667 19.2956L9.56916 18.2064Z"
        :fill="props.like ? '#FF4E29F4' : '#ffffff'"
        :stroke="props.like ? '' : '#e2e2e2'"/>
    </svg>

  </div>
</template>

<script lang="ts" setup>
import {withDefaults, defineProps} from 'vue';

const props = withDefaults(defineProps<{ like: boolean }>(), {like: false})
</script>

<style scoped lang="scss">
.hearts {
  width: fit-content;

  &:hover {
    path {
      fill: #FF2C00FF;
      stroke: #f6f6f6;
    }
  }
}
</style>