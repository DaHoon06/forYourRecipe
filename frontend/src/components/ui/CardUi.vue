<template>
  <div class="card__layout--container">
    <article class="card__layout scroll">
      <img :src="cardItem.profileImage" width="284" height="200" alt="음식 이미지" loading="lazy"/>
      <section class="card__body">
        <section class="card-ui__body">
          <text-font size="18" class="recipe--title">{{ cardItem.name }}</text-font>
          <text-font size="14" color="placeholder" class="recipe--description">{{ cardItem.desc }}</text-font>
          <figure class="recipe-like--wrapper">
            <img src="@/assets/images/icons/like.svg" class="mr-6" alt="좋아요" width="20" height="20"/>
            <figcaption>
              <text-font size="14">{{ cardItem.likes.length }}</text-font>
            </figcaption>
          </figure>

          <div class="flex mt-10">
            <span v-for="i of 4" :key="i" class="tags mr-4">{{ i }}</span>
          </div>
        </section>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {Recipe} from "@/interfaces/recipe";

export default class CardUi extends Vue {
  @Prop() readonly cardItem!: Recipe.Info;
}
</script>

<style lang="scss" scoped>
.card__layout--container {
  display: flex;
  justify-content: center;
}

.card__layout {
  display: inline-block;
  border: 1px solid $line;
  width: 284px;
  height: 350px;
  overflow: hidden;

  .card__body {
    padding: 8px 12px;
    max-height: 146px;
    height: 100%;

    .card-ui__body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 100%;

      .recipe--title {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        line-height: 1.2;
        height: 44px;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .recipe--description {
        margin-top: 10px;
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        line-height: 1.2;
        height: 1em;
        text-align: left;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .recipe-like--wrapper {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }
    }
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

@media screen and (max-width: 727px) {
  .card__layout--container {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 600px) {
  .card__layout {
    display: none;
  }
}
</style>
