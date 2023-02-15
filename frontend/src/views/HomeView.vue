<template>
  <main class="main">

    <section class="w-100">
      <IngredientsBox/>
    </section>


    <text-font color="red" size="20" weight="regular">
      custom font tag test
    </text-font>

    <section>
      <Button label="button component test" :click="showModal">
        icon
      </Button>

      <Button label="test" type="submit" variant="outline-button" :click="showModal"/>

      <Button type="reset" variant="rounded-button" :click="showModal"/>
      <Button type="reset" variant="black" :click="showModal" label="button"/>
    </section>

    <section class="main__body">
      <text-font color="black" size="24" weight="bold">오늘의 추천 요리</text-font>
      <hr/>
      <section class="flex">
        <CardUi class="mr-20" v-for="(i) in 4" :key="i"/>
      </section>
    </section>

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
import CardUi from "@/components/CardUi.vue";
import Button from "@/components/common/Button.vue";
import IngredientsBox from "@/components/IngredientsBox.vue";


type ModalComponent = InstanceType<typeof Modal>

@Options({
  components: {
    Button,
    Modal,
    CardUi,
    IngredientsBox
  }
})
export default class HomeView extends Vue {
  @Ref('modal') readonly modal!: ModalComponent;

  private showModal() {
    this.modal.show();
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  min-height: 1000px;
}

.main__body {
  padding: 10px 20px;
}
</style>