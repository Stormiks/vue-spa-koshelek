<template>
  <section class="main-page">
    <WalletTicker
      :placeholder="String(symbolNames[0])"
      @new-ticker="add"
    >
      <template v-slot:available-symbols>
        <span
          v-for="(symbolName) in symbolNames"
          :key="`available-ticker-${symbolName}`"
        >
          {{ symbolName }}
        </span>
      </template>
    </WalletTicker>

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
import WalletTicker from './WalletField';

export default {
  name: 'Main',
  components: {
    WalletTicker,
  },
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
