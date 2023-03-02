<template>
  <article class="not-found-page">
    <section class="not-found-page--container">
      <img src="@/assets/images/icons/notfound.svg" alt="404"/>
      <text-font class="pt-50" size="20" weight="semiBold">찾을수 없는 페이지 입니다.</text-font>
      <text-font color="textTitle" class="pt-50 w-100 center" size="18" weight="semiBold">
        존재하지 않는 주소를 입력하셨거나 <br/>
        <span class="pt-10">요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</span>
      </text-font>
      <custom-button variant="black" type="button" class="mt-50" @click="redirectHome">
        <text-font color="white">홈으로</text-font>
      </custom-button>
    </section>
  </article>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class NotFound extends Vue {

  private redirectHome(): void {
    this.$router.push('/');
  }
}
</script>

<style scoped lang="scss">
.not-found-page {
  width: 100%;
  height: 100%;

  &--container {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 767px) {
  .not-found-page {
    img {
      width: 30%;
    }

    p {
      font-size: 16px !important;
    }
  }
}
</style>