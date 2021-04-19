<template>
<div class="flex flex-col">
  <div class="max-w-xs">
    <label for="wallet" class="block text-sm font-medium text-gray-700"
      >Добавьте тикер</label
    >
    <div class="wallet__field mt-1 relative rounded-md shadow-md">
      <input
        v-model.trim="input"
        ref="walletInputNewTicker"
        @keydown.enter="handleNewTicker"
        type="text"
        name="wallet"
        id="wallet"
        class="border-gray-300 text-gray-900 sm:text-sm"
        :placeholder="`Например ${symbolNames[0]}`"
      />
    </div>
    <span v-if="isExistingSubscriptions">Такой тикер уже добавлен</span>
  </div>

  <div class="available-tickers mt-3.5">
    <small class="mr-1">доступные тикеры:</small>

    <ul class="inline">
      <li
        class="inline-block"
        v-for="(symbolName, index) in symbolNames"
        :key="`available-ticker-${symbolName}-${index}`"
      >
        <span
          role="button"
          @click="setToSymbolName(symbolName)"
          tabindex="0"
          class="px-1.5 py-1 mr-1"
          :class="{ 'active': symbolName === symNameInputValue }"
        >
          {{ symbolName }}
        </span>
      </li>
    </ul>
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
    setToSymbolName(str) {
      this.input = str;
      this.$refs.walletInputNewTicker.focus();
    },
  },
};
</script>

<style lang="less" scoped>
.wallet__field {
  input {
    display: block;
    border: 2px solid transparent;
    border-radius: 6px;
    width: 100%;
    padding-left: .75rem;
    padding-top: .75rem;
    padding-right: 2.5rem;
    padding-bottom: .75rem;
    transition: border .1s linear 0s;

    &:focus {
      @apply outline-none ring-gray-500 border-gray-500;
    }
  }
}

.available-tickers {
  span {
    @apply border-gray-500;
    border-width: 2px;
    border-style: solid;
    border-radius: 20px;
    padding: .35rem .75rem;

    &:focus {
      outline: none;
      border-width: 3px;
    }

    &:hover,
    &:focus,
    &.active {
      box-shadow: 0 0 3px 1px rgba(@color--black, 33%);
    }

    &.active {
      border-color: transparent;
      background-color: rgba(chocolate, 26%);
    }
  }
}
</style>
