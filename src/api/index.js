import axios from 'axios';

const tickersHandlers = new Map();

const instAxios = axios.create({
  timeout: 1000,
});

function sendToAxiosSubscriber(ticker) {
  // TODO: The base API address must be put into a constant
  /**
   * In theory, you need to put it in a constant,
   * but @vue/cli blocks proxied requests to an external API.
   * And specify this rendered address
   * to the "axios" instance being created
   */
  instAxios.get(`https://api.binance.com/api/v3/depth?symbol=${ticker}&limit=10`)
    .then((res) => res.data)
    .then((data) => {
      const handlers = tickersHandlers.get(ticker) ?? '';

      if (handlers) {
        handlers.forEach((fn) => {
          fn({
            bids: data.bids,
            asks: data.asks,
          });
        });
      }
    });
}

function loadTicker() {
  if (tickersHandlers.size === 0) {
    return;
  }

  const tickers = [...tickersHandlers.keys()];

  tickers.forEach((tickerName) => {
    sendToAxiosSubscriber(tickerName);
  });
}

export const subscribeToTicker = (tickerName, cb) => {
  const subscribers = tickersHandlers.get(tickerName) || [];

  sendToAxiosSubscriber(tickerName);

  tickersHandlers.set(tickerName, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};

window.tikers = tickersHandlers;

setTimeout(loadTicker, 5000);
