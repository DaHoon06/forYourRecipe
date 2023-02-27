<template>
  <footer class="footer">
    <hr/>

    <text-font color="white" type='eng'>
      © 2023. Dahoon06 & Hyperreal. All Rights Reserved.
    </text-font>

  </footer>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class Footer extends Vue {

}
</script>

<style scoped lang="scss">
.footer {
  background-color: $black;
  height: 140px;
  width: 100%;
  position: relative;
}

hr {
  border: none;
  background-color: $white;
  height: 1px;
  margin: 0;
}
</style>