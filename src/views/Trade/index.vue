<template>
  <section class="main-page">
    <WalletTicker
      :existing-subscriptions="symbolNames"
      @new-ticker="handleAddTicker"
    />

    <hr class="w-full border-t border-gray-600 my-4" />
    <template
      v-if="tickers.length"
    >
      <div
        v-for="(symbolName, index) in tickerNames"
        :key="`ticker-${index}`"
        class="ticker__table"
      >
        <button
          @click="handleRemoveTicker(symbolName)"
          class="ticker__btn ticker__btn_remove"
          type="button"
        >
          Удалить &#10006;
        </button>
        <h2 class="text-center">{{ symbolName }}</h2>

        <div class="ticker__table_box">
          <table
            v-for="(symbolTypePrices, typeName) in tikersPrice[symbolName]"
            :key="`symbol-${symbolName}-${typeName}`"
            class="table-auto flex-grow mx-1 my-2.5"
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
import WalletTicker from 'components/WalletField';

export default {
  name: 'Trade',
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
    handleAddTicker(newSymbol) {
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
    handleRemoveTicker(nameTickerToRemove) {
      this.tickers = this.tickers.filter((t) => {
        return !Object.prototype.hasOwnProperty.call(t, nameTickerToRemove);
      });

      unsubscribeFromTicker(nameTickerToRemove);
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
.ticker {
  &__btn {
    position: absolute;
    padding: .15rem .25rem;
    border-radius: 6px;

    &_remove {
      top: 5px;
      right: 15px;
      box-shadow: 0 0 3px 1px rgba(@color--black, 37%);
      transition: box-shadow .2s linear;

      &:hover,
      &:focus {
        box-shadow: 0 0 5px 2px rgba(@color--black, 54%);
      }
    }
  }
  &__table {
    position: relative;

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
    }

    caption {
      font-size: 1.2rem;
      font-weight: 600;
      padding: .25rem .25rem .5rem;
    }

    thead {
      td {
        padding: .25rem .25rem .5rem;
        text-align: center;
        font-weight: 500;
      }
    }

    tbody {
      td {
        line-height: 1.5rem;
      }
    }

    &_box {
      display: flex;
      padding-top: 1.5rem;
    }
  }
}
</style>
