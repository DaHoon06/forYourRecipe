<template>
  <article class="list__layout scroll">
    <article class="list__container">
      <div class="list-img--wrapper">
        <img :src="src" width="284" height="177" alt="test-img" loading="lazy"/>
      </div>
      <section class="list__body w-100">
        <slot/>
      </section>
    </article>

  </article>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

export default class ListsUi extends Vue {
  @Prop({default: '@/assets/images/default.jpg'}) readonly src?: string;
}
</script>

<style scoped lang="scss">
.list__layout {
  display: none;
  border-top: 1px solid $line;
  width: 100%;
  max-height: 160px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .list__container {
    display: flex;
    padding: 1rem;
  }

  .list-img--wrapper {
    width: 124px;
    height: auto;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-repeat: no-repeat;
    }
  }

  .list__body {
    padding: 8px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .list__layout {
    display: inline-block;
  }
}
</style>
