import axios from 'axios';

const tickersHandlers = new Map();

const instAxios = axios.create({
  timeout: 1000,
});

function loadTicker() {
  if (tickersHandlers.size === 0) {
    return;
  }

  const tickers = [...tickersHandlers.keys()];

  tickers.forEach((tickerName, index) => {
    instAxios.get(`https://api.binance.com/api/v3/depth?symbol=${tickerName}&limit=10`)
      .then((res) => res.data)
      .then((data) => {
        tickersHandlers[index] = {
          lastUpdateId: data.lastUpdateId,
        };

        const handlers = tickersHandlers.get(tickerName) ?? '';

        if (handlers) {
          handlers.forEach((fn) => {
            fn({
              bids: data.bids,
              asks: data.asks,
            });
          });
        }
      });
  });
}

export const subscribeToTicker = (tickerName, cb) => {
  const subscribers = tickersHandlers.get(tickerName) || [];
  console.log('subscribeToTicker ticker', tickerName);
  // console.log('subscribeToTicker subscribers', subscribers);
  tickersHandlers.set(tickerName, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};

window.tikers = tickersHandlers;

setTimeout(loadTicker, 5000);
