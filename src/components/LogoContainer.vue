<template>
<div class="header__logo mr-6">
  <LogoSvg class="logo" />
  <span class="title font-semibold text-xl tracking-tight">
    <slot />
  </span>
</div>
</template>

<script>
import LogoSvg from 'components/LogoSvg';

export default {
  name: 'LogoContainer',
  components: {
    LogoSvg,
  },
};
</script>

<style lang="less" scoped>
.header {
  &__logo {
    display: flex;
    align-items: center;
    flex-shrink: none;
  }
}

.title {
  white-space: nowrap;
}

.logo {
  svg& {
    width: 40px;
    margin-right: .5rem;
  }
}
</style>
