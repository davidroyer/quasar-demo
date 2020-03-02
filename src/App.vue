<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  /**
   * You have to user `return` here
   */
  preFetch({ store }) {
    return store.dispatch("init");
  }
};
</script>
