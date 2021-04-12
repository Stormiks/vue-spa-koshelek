<template>
  <div class="layout layout-default">
    <DefaultHeader />

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import DefaultHeader from './DefaultHeader';

export default {
  name: 'DefaultLayout',
  components: {
    DefaultHeader,
  },
};
</script>

<style lang="less" scoped>

</style>
