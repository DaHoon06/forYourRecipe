<template>
  <button :disabled="props.disabled" :class="[getButtonWrapper,{'disabled' : props.disabled}]" :type="props.type">
    {{ props.label }}
    <slot/>
  </button>
</template>

<script lang="ts" setup>
import {computed, defineProps, withDefaults} from "vue";

type ButtonType = 'button' | 'reset' | 'submit'
type Variant =
    'black'
    | 'black-square'
    | 'gray'
    | 'gray-square'
    | 'icon-button'
    | 'primary-outline'
    | 'secondary-outline'

interface Props {
  label?: string,
  variant?: Variant,
  type?: ButtonType,
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'black',
  type: 'button',
  disabled: false
});
const getButtonWrapper = computed(() => props.variant);

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

.primary-outline {
  @include defaultButtonOptions();
  border-color: $primary;
  background-color: $white;
  border-radius: 2px;

  &:hover {
    border-color: #9b6c40;
  }
}

.secondary-outline {
  @include defaultButtonOptions();
  border-color: $secondary;
  background-color: $white;
  border-radius: 2px;

  &:hover {
    border-color: $primary;
  }
}
</style>
