<template>
  <div class="layout layout-default">
    <header>
      <DefaultNavbar />
    </header>

    <main class="px-5 py-3">
      <router-view />
    </main>
  </div>
</template>

<script>
import DefaultNavbar from './DefaultNavbar';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultNavbar,
  },
};
</script>

<style lang="less" scoped>
main {

}
</style>
