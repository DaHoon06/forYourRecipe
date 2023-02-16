<template>
  <article class="box-container">
    <section class="box__body">
      <section class="ingredients-box">
        <div class="ingredients-box--status">
          <text-font size="20">바구니가 비어있습니다.</text-font>
          <text-font size="14" color="textSub" class="pt-13">재료를 선택해주세요.</text-font>
        </div>
      </section>
      <section class="ingredients-box--button pt-55">
        <custom-button type="button" variant="primary" @click="pickUpModal">
          <img src="@/assets/images/icons/basket.svg" alt="재료담기" width="20" height="20" class="mr-6"/>
          <text-font color="white">재료 담기</text-font>
        </custom-button>
      </section>
    </section>
  </article>

  <teleport to="#modal">
    <Modal ref="modal">
      <section class="selected-ingredients--container">
        <section>
          <text-font>재료를 선택해주세요.</text-font>
          <hr/>
          <select>
            <option>TEST</option>
          </select>
        </section>
        <section>
          선택한 재료 보여주기

          <br/>

          클릭했을 경우 disabled 표시 주기
        </section>

        <section>
          <text-font>선택한 재료</text-font>
          <hr/>
          <text-font size="14">랍스터</text-font>
        </section>
        <section>
          <custom-button type="button" variant="primary">
            <text-font color="white" size="14">저장</text-font>
          </custom-button>
        </section>

      </section>
    </Modal>
  </teleport>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Modal from "@/components/common/Modal.vue";
import {Ref} from "vue-property-decorator";
import {ModalComponent} from "@/types/type";
import {ins as axios} from "@/lib/axios";

@Options({
  components: {
    Modal
  }
})

export default class IngredientsBox extends Vue {
  @Ref('modal') readonly modal!: ModalComponent;

  ingredients = [];

  private async pickUpModal() {
    this.modal.show();
    //TODO: 재료 준비
    try {
      //TypeError: Property axios does not on type IngredientsBox
      //const {data} = await this.axios.get('/99999999999asd9sa9d9as');

      // TEMP
      const {data} = await axios.get('/');
    } catch (e) {
      console.log(e)
    }
  }


}
</script>

<style lang="scss" scoped>
.box-container {
  text-align: center;
  padding: 30px 0;
  width: 100%;
  height: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
}

.box__body {
  border: 1px solid $line;
  border-radius: 30px;
  max-width: 600px;
  min-width: 298px;
  width: 100%;
  height: 500px;
  min-height: 290px;
  //height: 100%;
  box-shadow: 0 2px 4px 0 rgba(100, 100, 100, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


.ingredients-box {
  border: 1px solid $line;
  border-radius: 50%;
  width: 310px;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &--status {
    display: flex;
    flex-direction: column;
  }
}

/* 재료 선택 모달 */
.selected-ingredients--container {
  padding: 8px 16px;
  text-align: left;
  width: 360px;
  height: 450px;
}

@media screen and (max-width: 1080px) {

}
</style>