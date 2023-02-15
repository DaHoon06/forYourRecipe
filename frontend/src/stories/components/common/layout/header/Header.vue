<template>
  <header class="header">
    <div class="wrapper">
      <div>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.875 2C12.6625 2 10.7125 3.4625 10.0875 5.5875C9.425 5.2875 8.725 5.125 8 5.125C6.67392 5.125 5.40215 5.65178 4.46447 6.58947C3.52678 7.52715 3 8.79892 3 10.125C3.00296 11.2323 3.37249 12.3074 4.0509 13.1826C4.7293 14.0577 5.6784 14.6836 6.75 14.9625V23.875H23V14.9625C25.2 14.3875 26.75 12.4 26.75 10.125C26.75 8.79892 26.2232 7.52715 25.2855 6.58947C24.3479 5.65178 23.0761 5.125 21.75 5.125C21.025 5.125 20.325 5.2875 19.6625 5.5875C19.0375 3.4625 17.0875 2 14.875 2ZM14.25 13.25H15.5V22H14.25V13.25ZM10.5 15.75H11.75V22H10.5V15.75ZM18 15.75H19.25V22H18V15.75ZM6.75 25.125V26.375C6.75 26.7065 6.8817 27.0245 7.11612 27.2589C7.35054 27.4933 7.66848 27.625 8 27.625H21.75C22.0815 27.625 22.3995 27.4933 22.6339 27.2589C22.8683 27.0245 23 26.7065 23 26.375V25.125H6.75Z"
            fill="white"/>
        </svg>

      </div>
      <div>
        <span class="welcome" v-if="user">Welcome, <b>{{ user.name }}</b>!</span>
        <my-button size="small" @click="$emit('logout')" label="Log out" v-if="user"/>
        <my-button size="small" @click="$emit('login')" label="Log in" v-if="!user"/>
      </div>
    </div>
  </header>
</template>

<script>
import './header.scss';
import MyButton from '../../button/Button.vue';

export default {
  name: 'my-header',

  components: {MyButton},

  props: {
    user: {
      type: Object,
    },
  },

  emits: ['login', 'logout', 'createAccount'],
};
</script>
