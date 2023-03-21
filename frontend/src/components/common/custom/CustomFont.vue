<template>
  <p class="default" :class="[getFontSize, getFontColor, getFontWeight, getFontType]">
    <slot/>
  </p>
</template>

<script lang="ts" setup>
import {withDefaults, defineProps, computed} from 'vue';

type FontSize = '12' | '13' | '14' | '15' | '16' | '18' | '20' | '22' | '24' | '25' | '26';
type FontColor =
  | 'black'
  | 'white'
  | 'placeholder'
  | 'red'
  | 'textTitle'
  | 'textSub'
  | 'gray'
  | 'gray2'
  | 'gold1'
type FontWeight = 'regular' | 'normal' | 'medium' | 'semiBold' | 'bold';
type FontType = 'kor' | 'eng';

interface Props {
  color?: FontColor,
  size?: FontSize,
  weight?: FontWeight,
  type?: FontType
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
  size: '14',
  weight: 'regular',
  type: 'kor'
});
const getFontSize = computed(() => `font-${props.size}`);
const getFontColor = computed(() => props.color);
const getFontWeight = computed(() => props.weight);
const getFontType = computed(() => props.type);
</script>

<style scoped lang="scss">
.font {
  @include default();
}

.kor {
  font-family: $kor;
}

.eng {
  font-family: $eng !important;
}

.default {
  display: inline-block;
  @include default();
}

.placeholder {
  @include placeholder();
}

.black {
  @include black();
}

.white {
  @include white();
}

.red {
  @include red();
}

.gray {
  @include gray();
}

.gray2 {
  @include gray2();
}

.textTitle {
  @include textTitle();
}

.textSub {
  @include textSub();
}

.gold1 {
  @include gold1();
}

.regular {
  @include font-weight-400();
}

.normal {
  @include font-weight-500();
}

.medium {
  @include font-weight-600();
}

.semiBold {
  @include font-weight-700();
}

.bold {
  @include font-weight-800();
}

@for $size from 1 to 40 {
  .font-#{$size} {
    font-size: $size + px !important;
  }
}
</style>
