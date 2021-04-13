/* eslint-disable quote-props */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const nameKeyStorage = 'crypto-list';

const tickersData = JSON.parse(localStorage.getItem(nameKeyStorage)) || [
  {
    'BTCUSDT': {},
  },
  {
    'BNBBTC': {},
  },
  {
    'ETHBTC': {},
  },
];

export default new Vuex.Store({
  state: {
    symbols: tickersData,
  },
  mutations: {
  },
  actions: {
    saveListTikers({ }, arr) {
      localStorage.setItem(nameKeyStorage, JSON.stringify(arr));
    },
  },
  modules: {
  },
});
