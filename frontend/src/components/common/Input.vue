<template>
  <input :type="type"/>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";


type InputType = 'text' | 'password' | 'number' | "hidden"

export default class Input extends Vue {
  @Prop({default: 'text'}) type!: InputType
}
</script>

<style scoped>

</style>