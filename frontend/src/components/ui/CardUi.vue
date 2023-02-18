<template>
  <article class="card__layout scroll">
    <img src="https://picsum.photos/400/400" width="284" height="177" alt="test-img"/>
    <section class="card__body">
      <slot/>
    </section>
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
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(2, 2, 2, 0.25);

  .card__body {
    padding: 8px 12px;
  }

  img {
    width: 100%;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  &:hover {
    border-color: rgba(130, 130, 130, 0.4);
    cursor: pointer;
    -webkit-filter: brightness(90%);
    filter: brightness(90%);
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 0;
  }
}
</style>
