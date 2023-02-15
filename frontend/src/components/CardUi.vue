<template>
  <article class="card__layout">
    <img src="https://picsum.photos/400/400" width="284" height="177" alt="test-img"/>
  </article>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class CardUi extends Vue {

}
</script>

<style lang="scss" scoped>
.card__layout {
  border: 1px solid $line;
  width: 284px;
  height: 288px;
  border-radius: 6px;
}
</style>