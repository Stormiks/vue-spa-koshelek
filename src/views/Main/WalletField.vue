<template>
<div class="flex flex-col">
  <div class="max-w-xs">
    <label for="wallet" class="block text-sm font-medium text-gray-700"
      >Добавьте тикер</label
    >
    <div class="mt-1 relative rounded-md shadow-md">
      <input
        v-model="input"
        @keydown.enter="handleNewTicker"
        type="text"
        name="wallet"
        id="wallet"
        class="block w-full p-3 pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
        :placeholder="`Например ${placeholder}`"
      />
    </div>
  </div>

  <div class="available-tickers mt-2.5">
    <small class="mr-1">доступные тикеры:</small>

    <span
      v-for="(symbolName) in symbolNames"
      :key="`available-ticker-${symbolName}`"
      class="px-1.5 py-1 mr-1"
      :class="{ 'active': isActiveSym(symbolName) }"
    >
      {{ symbolName }}
    </span>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WalletTicker',
  props: {
    placeholder: String,
  },
  data: () => ({
    input: '',
    formatInputValue: '',
  }),
  computed: {
    ...mapGetters({
      symbolNames: 'symbolNames',
    }),
  },
  methods: {
    isActiveSym(symName) {
      if (this.input === '') return false;

      if (String(symName).indexOf(this.input.toUpperCase()) > -1) {
        this.formatInputValue = symName.toUpperCase();
        return true;
      }

      return false;
    },
    handleNewTicker() {
      this.$emit('new-ticker', this.formatInputValue);
    },
  },
};
</script>

<style lang="less" scoped>
.available-tickers {
  span {
    border-radius: 6px;

    &.active {
      background-color: rgba(chocolate, 26%);
    }
  }
}
</style>
