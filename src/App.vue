<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
import Layout from '@/-common-/layout/Layout'

export default {
  name: 'app',
  components: { Layout }
}
</script>

<style lang="scss">
@import "./-common-/assets/style/main";
@import "../node_modules/bootstrap/scss/bootstrap";

#app {
  font-family: "Open Sans", sans-serif;
}
</style>
