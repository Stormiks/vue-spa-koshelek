<template>
  <section class="main-page">
    <div class="flex flex-col">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Добавьте тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            @keydown.enter="add"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full p-3 pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            :placeholder="`Например ${symbolNames[0]}`"
          />
        </div>
      </div>

      <div class="available-tickers mt-2.5">
        <small>доступные тикеры:</small>

        <span
          v-for="(symbolName) in symbolNames"
          :key="`available-ticker-${symbolName}`"
        >
          {{ symbolName }}
        </span>
      </div>
    </div>

    <hr class="w-full border-t border-gray-600 my-4" />

    <div
      v-for="(symbolName, index) in symbolNames"
      :key="`ticker-${index}`"
    >
      <h2 class="text-center">{{ symbolName }}</h2>

      <div class="table__container flex">
        <table
          v-for="(symbolTypePrices, typeName) in tikersPrice[symbolName]"
          :key="`symbol-${symbolName}-${typeName}`"
          class="flex-grow mx-1 my-2.5"
        >
          <caption>{{ typeName }}</caption>
          <thead>
            <tr>
              <td>Amount</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(prices, indexPrices) in symbolTypePrices"
              :key="`prices-${symbolName}-${typeName}-${indexPrices}`"
            >
              <td
                v-for="(price, indexPrice) in prices"
                :key="`price-${symbolName}-${typeName}-${indexPrice}`"
              >
                {{ price }}
              </td>
              <td>
                {{ formatTotalPrice(prices) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { subscribeToTicker, unsubscribeFromTicker } from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'Main',
  data: () => ({
    ticker: '',
    filter: '',
    tickers: [],
    tikersPrice: {},
    currentTicker: '',
  }),
  computed: {
    ...mapState({
      symbols: (state) => state.symbols,
    }),
    symbolNames() {
      if (this.symbols.length) {
        return this.symbols.map((item) => Object.keys(item)[0]);
      }

      return [];
    },
  },
  created() {
    const tickersData = localStorage.getItem('crypto-list') || [];

    if (this.symbolNames.length) {
      this.tickers = this.symbols;

      this.symbolNames.forEach((symbolName) => {
        subscribeToTicker(symbolName, (newPrices) => {
          this.updateTickers(symbolName, newPrices);
        });
      });
    }
  },
  mounted() {
    this.currentTicker = 'BTCUSDT';
  },
  methods: {
    add() {
      console.log(this.tiker);
    },
    updateTickers(tickerName, prices) {
      this.$set(this.tikersPrice, tickerName, prices);
    },
    formatTotalPrice(prices) {
      const pricesOne = () => !!prices[0];
      const pricesTwo = () => !!prices[1];

      if (prices.length === 2) {
        if (pricesOne() && pricesTwo()) {
          return Number(prices[1]) * Number(prices[0]);
        }

        return '';
      }

      return '';
    },
  },
};
</script>

<style lang="less" scoped>

</style>
