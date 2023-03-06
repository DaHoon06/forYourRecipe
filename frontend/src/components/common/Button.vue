<template>
  <button :disabled="disabled" :class="[ButtonWrapper,{'disabled' : disabled}]" :type="type">
    {{ label }}
    <slot/>
  </button>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

type ButtonType = 'button' | 'reset' | 'submit'
type Variant = 'black' | 'black-square' | 'gray' | 'gray-square' | 'icon-button'

export default class Button extends Vue {
  @Prop() readonly label?: string
  @Prop({default: 'black'}) readonly variant?: Variant
  @Prop({default: 'button'}) readonly type!: ButtonType
  @Prop({default: false}) readonly disabled?: boolean;

  get ButtonWrapper() {
    return this.variant
  }
}
</script>

<style scoped lang="scss">
@mixin defaultButtonOptions() {
  padding: 4px 8px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 46px;
}
.disabled {
  cursor: default;

  p {
    color: $white !important;
  }
}
.black {
  @include defaultButtonOptions();
  background-color: $button_black;
  color: $white;

  &:hover {
    background-color: $black;
  }
}

.gray {
  @include defaultButtonOptions();
  background-color: $button_gray;
  color: $line;

  &:hover {
    background-color: #d7d7d7;
  }
}

.black-square {
  @include defaultButtonOptions();
  border-radius: 4px;
  background-color: $button_black;
  color: $white;

  &:hover {
    background-color: $black;
  }
}

.gray-square {
  @include defaultButtonOptions();
  border-radius: 4px;
  background-color: $button_gray;
  color: $line;

  &:hover {
    background-color: #d7d7d7;
  }
}

.icon-button {
  @include defaultButtonOptions();
  padding: 0;
  width: fit-content !important;
  height: auto;
  background-color: transparent;

  &:hover {
    -webkit-filter: brightness(90%);
    filter: brightness(90%);
  }
}

</style>
