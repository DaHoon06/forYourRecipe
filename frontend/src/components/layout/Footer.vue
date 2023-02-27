<template>
  <footer class="footer pt-40">
    <hr/>

    <section class="footer-copyright">
      <text-font color="white" type='eng'>
        © 2023. &nbsp;
        <a href="https://github.com/DaHoon06" target="_blank">Dahoon06</a> &nbsp; & &nbsp; <a href="https://github.com/hprl" target="_blank">Hyperreal</a>.
        &nbsp; All Rights Reserved.
      </text-font>
    </section>



  </footer>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class Footer extends Vue {

}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: $white;
}
.footer {
  background-color: $black;
  height: 140px;
  width: 100%;
  position: relative;

  .footer-copyright {
    width: 100%;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

hr {
  border: none;
  background-color: $line;
  height: 1px;
  margin: 0;
}
</style>
