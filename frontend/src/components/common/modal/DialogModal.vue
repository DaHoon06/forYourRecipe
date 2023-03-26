<template>
  <teleport to="#modal">
    <div class="modal" aria-modal="true" v-show="open">

      <section class="modal__body">
        <text-font size="16">{{ props.title }}</text-font>
        <text-font size="14">{{ props.body }}</text-font>
        <div class="pt-16 flex justify-end">
          <custom-button class="w-50" variant="black" @click="close">딛기</custom-button>
        </div>
      </section>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import {defineProps, ref, watch} from "vue";
import store from '@/store';

const props = defineProps(['title', 'body', 'isOpen']);
const open = ref(false);
open.value = props.isOpen || false;

const close = () => {
  store.commit('utilModule/setDialog', false)
  open.value = false;
}
</script>

<style scoped lang="scss">

.modal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background: rgba($color: $black, $alpha: 0.7);
  align-items: center;
  z-index: 999;

  & .modal__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 380px;
    width: auto;
    height: auto;
    min-height: 160px;
    text-align: center;
    background-color: $white;
    border: 1px solid black;
    border-radius: 2px;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
