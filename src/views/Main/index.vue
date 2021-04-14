<template>
  <section class="main-page">
    <WalletTicker
      :existing-subscriptions="symbolNames"
      @new-ticker="add"
    />

    <hr class="w-full border-t border-gray-600 my-4" />
    <template
      v-if="tickers.length"
    >
      <div
        v-for="(symbolName, index) in tickerNames"
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
                  {{ formatPrice(price) }}
                </td>
                <td>
                  {{ formatTotalPrice(prices) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { subscribeToTicker, unsubscribeFromTicker } from '@/api';
import { mapState, mapGetters, mapActions } from 'vuex';
import WalletTicker from './WalletField';

export default {
  name: 'Main',
  components: {
    WalletTicker,
  },
  data: () => ({
    ticker: '',
    tickers: [],
    tikersPrice: {},
    currentTicker: '',
  }),
  computed: {
    ...mapState({
      symbols: (state) => state.symbols,
    }),
    tickerNames() {
      return this.tickers.map((item) => Object.keys(item)[0]) || [];
    },
    ...mapGetters({
      symbolNames: 'symbolNames',
    }),
  },
  created() {
    if (this.symbolNames.length) {
      this.tickers = this.symbols;

      this.symbolNames.forEach((symbolName) => {
        subscribeToTicker(symbolName, (newPrices) => {
          this.updateTickers(symbolName, newPrices);
        });
      });
    }
  },
  methods: {
    ...mapActions({
      save: 'saveListTikers',
    }),
    add(newSymbol) {
      if (this.tickerNames.includes(newSymbol)) return;

      const currentTicker = {
        [newSymbol]: {
          bids: [],
          asks: [],
        },
      };

      this.tickers = [...this.tickers, currentTicker];

      subscribeToTicker(newSymbol, (newPrices) => {
        this.updateTickers(newSymbol, newPrices);
      });
    },
    updateTickers(tickerName, prices) {
      this.$set(this.tikersPrice, tickerName, prices);
    },
    formatPrice(price) {
      const formatToNumberPrice = Number(price);
      const currentPrice = formatToNumberPrice > 1 ? formatToNumberPrice.toFixed(2) : formatToNumberPrice.toPrecision(2);

      return currentPrice;
    },
    formatTotalPrice(prices) {
      const pricesOne = () => !!prices[0];
      const pricesTwo = () => !!prices[1];

      if (prices.length === 2) {
        const formatPriceOne = this.formatPrice(prices[0]);
        const formatPriceTwo = this.formatPrice(prices[1]);

        if (pricesOne() && pricesTwo()) {
          return this.formatPrice(formatPriceOne * formatPriceTwo);
        }

        return '';
      }

      return '';
    },
  },
  watch: {
    tickers(newTikers) {
      this.save(newTikers);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
