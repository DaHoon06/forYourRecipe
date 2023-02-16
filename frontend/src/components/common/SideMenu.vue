<template>
  <Transition name="slide-fade">
    <aside class="side-menu" v-show="isOpen">
      <nav class="side-menu--items">
        <ul>
          <li>로그인</li>
        </ul>
      </nav>
    </aside>
  </Transition>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop, Watch} from "vue-property-decorator";

export default class SideMenu extends Vue {
  @Prop({default: false}) isOpen!: boolean;

  @Watch('isOpen')
  private disabledScroll() {
    const html = document.querySelector('html');
    if (html) this.isOpen ? html.style.overflow = 'hidden' : html.style.overflow = ''
  }

}
</script>

<style scoped lang="scss">
.side-menu {
  background-color: rgba(233, 233, 233, 0.44);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  margin-top: 1rem;
  width: 100%;
  min-height: 100%;
  height: auto;
  position: fixed;
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

.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>