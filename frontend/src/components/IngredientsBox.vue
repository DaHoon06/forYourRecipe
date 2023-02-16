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
  <!-- TODO: 재료 선택 컴포넌트 분리 작업 -->
  <teleport to="#modal">
    <Modal ref="modal">
      <section class="selected-ingredients--container">
        <section>
          <text-font>재료를 선택해주세요.</text-font>
          <hr/>
          <div class="select-box">
            <select v-model="selected">
              <option v-for="(category) of mockData" :key="category.id" :value="category.kind">
                <text-font size="12">{{ category.name }}</text-font>
              </option>
            </select>
            <span class="angle-icons">
              <img
                src="@/assets/images/icons/drop.svg" alt="드랍다운" width="8" height="8"/>
            </span>
          </div>


        </section>
        <section class="ingredients-items--container scroll">

          <span v-for="(value) of selected" :key="value.id" class="ingredient-icon--wrapper"
                @click="selectedIngredient(value.id)">
            <img src="@/assets/images/icons/ingredients/banana.svg" alt="식재료" width="32" height="32"/>
          </span>


        </section>

        <section class="selected-items">
          <text-font>선택한 재료</text-font>
          <hr/>
          <text-font size="14">랍스터</text-font>
          {{ ingredients }}
        </section>
        <section class="selected-ingredients__button--wrapper">
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
import {ins} from "@/lib/axios";

interface IngredientType {
  id: number,
  name: string
}

interface IngredientCategories {
  id: number,
  name: string
  kind: IngredientType[]
}

@Options({
  components: {
    Modal
  }
})
export default class IngredientsBox extends Vue {
  @Ref('modal') readonly modal!: ModalComponent;

  mockData: IngredientCategories[] = [
    {
      id: 1,
      name: '육류',
      kind: [
        {
          id: 1,
          name: '소고기'
        },
        {
          id: 2,
          name: '돼지고기'
        },
        {
          id: 3,
          name: '닭고기'
        },
        {
          id: 4,
          name: '소고기'
        },
        {
          id: 5,
          name: '돼지고기'
        },
        {
          id: 6,
          name: '닭고기'
        },
        {
          id: 7,
          name: '소고기'
        },
        {
          id: 8,
          name: '돼지고기'
        },
        {
          id: 9,
          name: '닭고기'
        },
        {
          id: 10,
          name: '닭고기'
        },
        {
          id: 11,
          name: '소고기'
        },
        {
          id: 12,
          name: '돼지고기'
        },
        {
          id: 13,
          name: '닭고기'
        },
      ]
    },
    {
      id: 2,
      name: '해산물',
      kind: [
        {
          id: 1,
          name: '게'
        },
        {
          id: 2,
          name: '생선'
        },
        {
          id: 3,
          name: '조개'
        },
      ]
    },
    {
      id: 3,
      name: '야채',
      kind: [
        {
          id: 1,
          name: '마늘'
        },
        {
          id: 2,
          name: '양파'
        },
        {
          id: 3,
          name: '버섯'
        },
      ]
    },
    {
      id: 4,
      name: '과일',
      kind: [
        {
          id: 1,
          name: '오렌지'
        },
        {
          id: 2,
          name: '포도'
        },
        {
          id: 3,
          name: '사과'
        },
      ]
    },
    {
      id: 5,
      name: '음료',
      kind: [
        {
          id: 1,
          name: '와인'
        },
        {
          id: 2,
          name: '맥주'
        },
        {
          id: 3,
          name: '사이다'
        },
      ]
    },
  ]

  selected = [];
  ingredients = [];

  private async pickUpModal() {
    this.modal.show();
    //TODO: 재료 준비
    try {
      //TypeError: Property axios does not on type IngredientsBox
      //const {data} = await this.axios.get('/99999999999asd9sa9d9as');

      // TEMP
      const {data} = await ins.get('/');
    } catch (e) {
      console.log(e)
    }
  }

  private selectedIngredient(key: number) {
    const choice = this.selected.filter((value: IngredientType) => {
      const {id} = value
      return id === key;
    })
    this.ingredients.push(...choice)
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
  width: 420px;
  height: 500px;


  .select-box {
    position: relative;
    width: 150px;
    height: 35px;
    border-radius: 4px;
    border: 1px solid $pointColor;

    select::-ms-expand {
      display: none;
    }

    select {
      -o-appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      cursor: pointer;
      width: inherit;
      height: inherit;
      background: transparent;
      border: 0 none;
      outline: 0 none;
      padding: 0 5px;
      position: relative;
      z-index: 3; // select가 위로 올라와야 함


      option {
        background: $white;
        color: $black;
        padding: 3px 0;
        font-size: 16px;
      }
    }

    .angle-icons {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 35px;
      height: inherit;
      border-left: 1px solid $pointColor;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50%;
        transition: .3s; // 부드럽게 회전
      }
    }

    select:focus + .angle-icons img {
      transform: rotate(180deg);
    }

  }


  .ingredients-items--container {
    min-height: 200px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
    column-gap: 10px;
    row-gap: 0;
    padding: 10px 0;
    height: 200px;
    overflow-y: auto;

    .ingredient-icon--wrapper {
      border: 1px solid $line;
      border-radius: 50%;
      width: 52px;
      height: 52px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        border-color: #c2c2c2;
        background-color: rgba(245, 245, 245, 0.5);
      }
    }
  }

  .selected-items {
    height: 100px;
  }

  .selected-ingredients__button--wrapper {
    width: 100%;
    display: flex;
    justify-content: end;
  }
}

@media screen and (max-width: 1080px) {

}
</style>