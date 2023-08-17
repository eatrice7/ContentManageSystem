<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-image: url(../../assets/img/login-bg.svg);
}
</style>
