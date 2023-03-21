<template>
  <section class="recipe">
    <slot/>
  </section>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.recipe {
  padding: 25px 36px;
  border: 1px solid $hr;
  border-radius: 1px;
  background-color: $white;
  box-shadow: 0 2px 4px 0 rgba(100, 100, 100, 0.25);
  max-width: 100%;
  height: 100%;
  margin: auto;
}

@media screen and (max-width: 600px) {
  .recipe {
    padding: 1rem 0.8rem;
  }
}
</style>
