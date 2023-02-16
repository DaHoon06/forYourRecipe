<template>
  <aside class="side-menu" v-show="isOpen">
    <nav class="side-menu--items">
      <ul>
        <li>로그인</li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop} from "vue-property-decorator";

export default class SideMenu extends Vue {
  @Prop({default: false}) isOpen!: boolean;

}
</script>

<style scoped lang="scss">
.side-menu {
  background-color: rgba(233, 233, 233, 0.44);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  margin-top: 1rem;
  width: 100%;
  height: 100vh;
  position: absolute;
  right: 0;
  z-index: 99;

  &--items {
    background-color: $white;
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: 100%;
  }
}
</style>