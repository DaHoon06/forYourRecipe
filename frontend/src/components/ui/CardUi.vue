<template>
  <article class="card__layout scroll">
    <img :src="src" width="284" height="177" alt="음식 이미지" loading="lazy"/>
    <section class="card__body">
      <slot/>
    </section>
  </article>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

export default class CardUi extends Vue {
  @Prop({default: '@/assets/images/default.jpg'}) readonly src?: string;
}
</script>

<style lang="scss" scoped>
.card__layout {
  display: inline-block;
  border: 1px solid $line;
  width: 284px;
  height: 288px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(2, 2, 2, 0.25);

  .card__body {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

@media screen and (max-width: 600px) {
  .card__layout {
    display: none;
  }
}
</style>
