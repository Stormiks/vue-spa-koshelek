import Vue from 'vue';

// eslint-disable-next-line no-multiple-empty-lines
export const before = (to, from, next) => {
  next();
};

// export const resolve = function (to, from, next) {
//   next()
// }

export const after = (to, from) => {
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || '';
  });
};
