<template>
  <h1 class="mark--container">
    <text-font size="18" type="eng" color="black" weight="medium">{{ props.label }}</text-font>
  </h1>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

interface Props {
  label: string,
}

const props: Props = defineProps(['label'])

</script>

<style scoped lang="scss">
.mark--container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-left: 3px solid $black;
  border-right: 3px solid $black;
  height: 35px;
  width: 420px;
}

@media screen and (max-width: 600px) {
  .mark--container {
    width: 300px;
  }
}
</style>
