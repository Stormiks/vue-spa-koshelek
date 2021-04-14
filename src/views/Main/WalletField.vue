<template>
<div class="flex flex-col">
  <div class="max-w-xs">
    <label for="wallet" class="block text-sm font-medium text-gray-700"
      >Добавьте тикер</label
    >
    <div class="mt-1 relative rounded-md shadow-md">
      <input
        v-model.trim="input"
        @keydown.enter="handleNewTicker"
        type="text"
        name="wallet"
        id="wallet"
        class="block w-full p-3 pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
        :placeholder="`Например ${symbolNames[0]}`"
      />
    </div>
    <span v-if="isExistingSubscriptions">Такой тикер уже добавлен</span>
  </div>

  <div class="available-tickers mt-2.5">
    <small class="mr-1">доступные тикеры:</small>

    <span
      v-for="(symbolName, index) in symbolNames"
      :key="`available-ticker-${symbolName}-${index}`"
      class="px-1.5 py-1 mr-1"
      :class="{ 'active': symbolName === symNameInputValue }"
    >
      {{ symbolName }}
    </span>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WalletTicker',
  props: {
    existingSubscriptions: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    input: '',
    symNameInputValue: '',
  }),
  computed: {
    ...mapState({
      symbolNames: (state) => state.availableSymbolsName,
    }),
    isExistingSubscriptions() {
      return this.input !== '' ? this.existingSubscriptions.includes(this.formatInputValue) : false;
    },
    formatInputValue() {
      return this.symNameInputValue !== '' ? this.symNameInputValue.toUpperCase() : '';
    },
  },
  watch: {
    input(newValue) {
      if (this.input !== '' && Array.isArray(this.symbolNames)) {
        const currentArr = this.symbolNames.find((element) => {
          if (!element.includes(newValue.toUpperCase(), 0)) return false;

          return element;
        });

        if (currentArr && currentArr.length) {
          // eslint-disable-next-line prefer-destructuring
          this.symNameInputValue = currentArr;
        }
      } else this.symNameInputValue = '';
    },
  },
  methods: {
    handleNewTicker() {
      if (this.isExistingSubscriptions) return;

      this.$emit('new-ticker', this.formatInputValue);

      this.input = '';
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
