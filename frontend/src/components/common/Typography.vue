<template>
  <p class="default" :class="[FontSize, FontColor, FontWeight]">
    <slot/>
  </p>
</template>

<script lang="ts">
import {Prop} from "vue-property-decorator";
import {Vue} from "vue-class-component";

type FontSize = '12' | '13' | '14' | '15' | '16' | '18' | '20' | '22' | '24';
type FontColor =
  | 'black'
  | 'white'
  | 'placeholder'
  | 'red'
  | 'textBody'
  | 'textTitle'
  | 'gray'
type FontWeight = 'regular' | 'normal' | 'medium' | 'semiBold' | 'bold';

export default class Typography extends Vue {
  @Prop({default: 'black'}) readonly color!: FontColor;
  @Prop({default: '14'}) readonly size!: FontSize;
  @Prop({default: 'regular'}) readonly weight!: FontWeight;

  get FontSize() {
    return `font-${this.size}`;
  }

  get FontColor() {
    return this.color;
  }

  get FontWeight() {
    return this.weight;
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/font";

.font {
  @include default();
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

.textTitle {
  @include textTitle();
}

.textBody {
  @include textBody();
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
