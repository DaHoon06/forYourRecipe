<template>
  <header class="header">
    <section class="wrapper">
      <img src="@/assets/images/icons/cook.svg" alt="로고">

      <Button type="button" variant="icon-button">
        <img src="@/assets/images/icons/hamburger.svg" alt=""/>
      </Button>
    </section>
  </header>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Button from "@/components/common/Button.vue";

@Options({
  components: {
    Button
  }

})
export default class Header extends Vue {
}
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid $line;
  background-color: $pointColor;
  width: 100%;
  height: 64px;
  padding: 15px 20px;

  .wrapper {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>