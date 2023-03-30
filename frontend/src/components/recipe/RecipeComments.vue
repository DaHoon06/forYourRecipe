<template>
  <div class="comment-container">
    <section class="flex pt-10 pb-10" v-for="(value) of 5" :key="value">
      <div class="recipe-comment--user-profile">
        <picture>
          <img src="https://4u-recipe.s3.ap-northeast-2.amazonaws.com/profile/profile.svg" height="30" width="30"
               alt="테스트 이미지"/>
        </picture>
        <div class="flex-column justify-content-around pl-10">
          <text-font color="black" weight="medium" size="14">전다훈</text-font>
          <text-font color="textSub" weight="regular" size="12" class="pt-6">2023.03.30</text-font>
        </div>
      </div>
      <div class="comment-description">
        <text-font color="textSub" weight="regular" size="16">Lorem ipsum dolor sit amet consectetur. In nibh
          ultricies mauris a. Pretium orci mi velit vel
          rhoncus gravida lacus phasellus ornare. Morbi purus scelerisque quam proin vitae mattis commodo volutpat
          lorem. Orci arcu pellentesque egestas erat malesuada elementum turpis nulla.
          Lorem ipsum dolor sit amet consectetur. In nibh ultricies mauris a. Pretium orci mi velit vel rhoncus
          gravida lacus phasellus ornare. Morbi purus scelerisque quam proin vitae mattis
        </text-font>
      </div>
    </section>
    <section class="comment-pagination">
      <ul>
        <li :class="currentPage === page ? 'current-page' : ''">
          <text-font size="12">1</text-font>
        </li>
        <li>
          <text-font size="12">2</text-font>
        </li>
        <li>
          <text-font size="12">3</text-font>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const page = ref(1);
const currentPage = ref(1);

</script>

<style lang="scss" scoped>
.comment-container {

  .recipe-comment--user-profile {
    display: flex;
    align-items: center;
    width: 120px;
  }

  .comment-description {
    width: calc(100% - 120px);
  }

  .comment-pagination {
    width: 100%;
    height: 100px;

    ul {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .current-page {
        background-color: $black;
        border-radius: 50%;
        width: 30px;
        height: 30px;

        p {
          color: $white;
        }
      }

      li {
        padding: 0 0.8em;
      }
    }
  }

}


</style>