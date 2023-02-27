<template>
  <div class="modal" v-show="isOpen">
    <section class="modal__body" :class="scroll && 'scroll'">
      <slot/>
    </section>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";

@Options({})
export default class Modal extends Vue {
  @Prop({default: true}) scroll!: boolean;

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
  z-index: 999;

  & .modal__body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto;
    height: auto;
    text-align: center;
    background-color: $white;
    border-radius: 1px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    transform: translateX(-50%) translateY(-50%);
  }

}
</style>
