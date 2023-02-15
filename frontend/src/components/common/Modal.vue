<template>
  <div class="modal" v-show="isOpen">
    <section class="modal__body">
      <button type="button" @click="hide">&times;</button>
      <slot/>
    </section>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({})
export default class Modal extends Vue {
  isOpen = false;

  show() {
    this.isOpen = true;
  }

  hide() {
    this.isOpen = false;
  }

}
</script>

<style scoped lang="scss">
@import "../../assets/css/color";

.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($color: $black, $alpha: 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  & .modal__body {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 470px;
    min-height: 620px;
    text-align: center;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>