<template>
<div class="flex flex-col">
  <div class="max-w-xs">
    <label for="wallet" class="block text-sm font-medium text-gray-700"
      >Добавьте тикер</label
    >
    <div class="mt-1 relative rounded-md shadow-md">
      <input
        @keydown.enter="handleNewTicker"
        type="text"
        name="wallet"
        id="wallet"
        class="block w-full p-3 pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
        :placeholder="`Например ${placeholder}`"
      />
    </div>
  </div>

  <div class="available-tickers mt-2.5">
    <small>доступные тикеры:</small>

    <slot name="available-symbols" />
  </div>
</div>
</template>

<script>
export default {
  name: 'WalletTicker',
  props: {
    placeholder: String,
  },
  methods: {
    handleNewTicker(e) {
      console.log('handleNewTicker', e);
      this.$emit('new-ticker', e);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
