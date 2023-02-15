<template>
  <main>
    <text-font color="red" size="20" weight="regular">TEST</text-font>

    <button type="button" @click="showModal">showModal</button>
    <teleport to="#modal">
      <Modal ref="modal">
        모달 뾰로로롱
      </Modal>
    </teleport>
  </main>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Modal from "@/components/common/Modal.vue";
import {Ref} from "vue-property-decorator";

type ModalComponent = InstanceType<typeof Modal>

@Options({
  components: {
    Modal
  }
})
export default class HomeView extends Vue {
  @Ref('modal') readonly modal!: ModalComponent;

  private showModal() {
    this.modal.show();
  }

}
</script>

<style scoped>

</style>