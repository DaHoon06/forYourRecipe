<template>
  <div class="modal" v-show="isOpen">
    <section class="modal__body">
      <div class="w-100 modal-close__button--wrapper">
        <button type="button" @click="hide" class="modal-close__button">x</button>
      </div>

      <slot/>
    </section>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Watch} from "vue-property-decorator";

@Options({})
export default class Modal extends Vue {
  isOpen = false;

  @Watch('isOpen')
  private disabledScroll() {
    const html = document.querySelector('html');
    if (html) this.isOpen ? html.style.overflow = 'hidden' : html.style.overflow = ''
  }

  show() {
    this.isOpen = true;
  }

  hide() {
    this.isOpen = false;
  }

}
</script>

<style scoped lang="scss">

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

  .modal-close__button--wrapper {
    padding: 10px;
    display: flex;
    justify-content: flex-end;


    .modal-close__button {
      border: 1px solid #d5d5d5;
      background-color: #F4F4F4;
      color: #d5d5d5;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 4px;
      box-shadow: 0.2px 0.5px 1px 0 rgba(0, 0, 0, 0.5);

      &:hover {
        border-color: #b0b0b0;
        color: #b0b0b0;
        box-shadow: none;
      }
    }
  }


  & .modal__body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    text-align: center;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    transform: translateX(-50%) translateY(-50%);
  }

}
</style>