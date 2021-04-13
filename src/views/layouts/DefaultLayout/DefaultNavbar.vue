<template>
<nav class="header__navbar relative p-6">
  <LogoContainer>
    SPA Кошелек
  </LogoContainer>

  <div class="block lg:hidden">
    <button
      @click="onShowMenu"
      type="button"
      class="dropdown__btn px-1.5 py-0.5"
      :class="{
        'active': isOpenMenu
      }"
    >
      <transition
        name="slide-fade"
      >
        <SvgIcon
          :key="'menu-open'"
          v-if="!isOpenMenu"
          :name="'menu-open'"
        />
        <SvgIcon
          :key="'menu-close'"
          v-else
          :name="'menu-close'"
        />
      </transition>
    </button>
  </div>
  <transition
    mode="in-out"
    name="dropdown"
    appear
  >
    <NavMenu
      v-show="isOpenMenu"
      class="navbar__nav dropdown__menu"
    >
      <li>
        <router-link
          :to="{
            name: 'Main'
          }"
          class=""
        >
          Биржа криптовалюты
        </router-link>
      </li>
      <li>
        <router-link
          :to="{
            name: 'Settings'
          }"
          class=""
        >
          Настройки
        </router-link>
      </li>
    </NavMenu>
  </transition>
  <NavMenu class="navbar__nav">
    <li>
      <router-link
        :to="{
          name: 'Main'
        }"
        class=""
      >
        Биржа криптовалюты
      </router-link>
    </li>
    <li>
      <router-link
        :to="{
          name: 'Settings'
        }"
        class=""
      >
        Настройки
      </router-link>
    </li>
  </NavMenu>
</nav>
</template>

<script>
import LogoContainer from 'components/LogoContainer';
import NavMenu from 'components/NavMenu';
import SvgIcon from 'components/SvgIcon';

export default {
  name: 'DefaultNavbar',
  components: {
    LogoContainer,
    NavMenu,
    SvgIcon,
  },
  data: () => ({
    isOpenMenu: false,
    listUrl: [],
  }),
  methods: {
    onShowMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
};
</script>

<style lang="less" scoped>
.dropdown {
  &__btn {
    display: flex;
    align-items: center;
    border-radius: 6px;
    border: 1px solid transparent;
    height: 40px;
    width: 40px;
    transition: all .2s linear 0s;
    overflow: hidden;
    position: relative;

    &:hover {
      border-color: lighten(#000, 40%);
    }

    @media (min-width: 1024px) {
      display: none;
    }
  }
  &__menu {
    li {
      &:hover {
        background-color: rgba(#87d2de, 32%);
      }
    }

    @media (min-width: 1024px) {
      display: none;
    }
  }
}

.btn {
  &__icon {
    svg {
      display: block;
      width: inherit;
      height: auto;
    }
  }
}
nav {
  background-color: rgba(@color--azure, 20%);
}

.navbar {
  &__nav {
    position: absolute;
    right: 0;
    top: 100%;
    margin-right: 1.5rem;

    &:not(.dropdown__menu) {
      display: none;

      @media (min-width: 1024px) {
        display: flex;
        position: unset;
        margin-right: unset;
      }
    }
  }
}

.header {
  &__navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all .8s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
