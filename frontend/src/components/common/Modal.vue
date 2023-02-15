<template>
 <div class="modal" v-show="isOpen">
   <slot />
 </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";
import {ref} from "vue";

@Options({
  setup() {
    const isOpen = ref(false)
    const hide = () => {
      isOpen.value = false;
    };
    const show = () => {
      isOpen.value = true;
    }
    return { isOpen, hide, show }
  }
})
export default class Modal extends Vue {
  @Prop() readonly isOpen!: boolean
}
</script>

<style scoped>
.modal {
  border: 1px solid gray;
  width: 500px;
  height: 500px;
}
</style>