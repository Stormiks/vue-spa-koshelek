<template>
<div class="nav__list">
  <ul class="nav__menu">
    <slot />
  </ul>
</div>
</template>

<script>
export default {
  name: 'NavMenu',
};
</script>

<style lang="less" scoped>
.nav {
  &__list {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    width: 100%;

    @media (min-width: 1024px) {
      align-items: center;
      width: auto;
    }
  }

  &__menu {
    border-radius: 6px;

    @media (max-width: 1023px) {
      box-shadow: 0 0 2px 0 @color--white;
    }

    a {
      display: block;
      font-size: .95rem;
      line-height: 1.75rem;
      text-align: right;
      padding-left: .5rem;
      padding-right: .5rem;

      &:hover {
        text-decoration: underline;
      }

      @media (min-width: 1024px) {
        display: inline-block;
        font-size: 1.1rem;
        line-height: 2.25rem;
        text-align: left;
      }
    }

    li {
      display: inline;
      font-size: .8rem;
      line-height: 1.25rem;
      padding: .25rem .75rem;
      margin-top: .2rem;
      margin-bottom: .2rem;
      transition: background .14s linear 0s;

      @media (max-width: 1023px) {
        display: block;
      }

      @media (min-width: 1024px) {
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
