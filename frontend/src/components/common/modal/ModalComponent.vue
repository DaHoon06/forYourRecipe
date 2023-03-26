<template>
  <div class="modal" aria-modal="true" v-show="isOpen">
    <section class="modal__body" :class="scroll && 'scroll'">
      <slot/>
    </section>
  </div>
</template>

<script lang="ts">
import {ref, Ref, watchEffect, defineComponent} from "vue";

export default defineComponent({
  props: [
    'scroll'
  ],
  setup(props) {
    const isOpen: Ref<boolean> = ref(false);

    const disabledScroll = () => {
      const html = document.querySelector('html');
      if (html) isOpen.value ? html.style.overflow = 'hidden' : html.style.overflow = ''
    }
    watchEffect(() => disabledScroll());

    const show = () => {
      isOpen.value = true;
    }

    const hide = () => {
      isOpen.value = false;
    }
    return {
      show, hide, props, isOpen
    }
  }
})
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
