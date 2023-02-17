<template>
  <button :class="ButtonWrapper" :type="type">
    {{ label }}
    <slot/>
  </button>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

type ButtonType = 'button' | 'reset' | 'submit'
type Variant = 'primary' | 'outline-button' | 'rounded-button' | 'black' | 'icon-button' | 'gray'

export default class Button extends Vue {
  @Prop() readonly label?: string
  @Prop({default: 'primary'}) readonly variant?: Variant
  @Prop({default: 'button'}) readonly type!: ButtonType

  get ButtonWrapper() {
    return this.variant
  }
}
</script>

<style scoped lang="scss">
@mixin defaultButtonOptions() {
  padding: 4px 8px;
  border: 1px solid transparent;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 46px;
}

.icon-button {
  @include defaultButtonOptions();
  padding: 0;
  width: fit-content !important;
  height: auto;
}

.primary {
  @include defaultButtonOptions();
  background-color: $pointColor;
  color: $white;

  &:hover {
    background-color: $pointColor;
  }
}

.outline-button {
  @include defaultButtonOptions();
  background-color: $white;
  color: $black;
  border-color: $pointColor;
}

.rounded-button {
  @include defaultButtonOptions();
  background-color: $pointColor;
  color: $black;
  border-radius: 12px;
}

.black {
  @include defaultButtonOptions();
  background-color: $button_black;
  color: $black;
  border-color: transparent;
}

.gray {
  @include defaultButtonOptions();
  background-color: $button_gray;
  color: $gray2;
  border-color: transparent;
}

</style>