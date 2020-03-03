<template>
  <q-page class="flex flex-center">
    <q-btn
      color="primary"
      icon="check"
      label="Google Login"
      @click="handleGoogleLogin"
    />
    <q-btn color="secondary" label="Logout" @click="handleLogout" />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",

  methods: {
    handleGoogleLogin() {
      this.$q.electron.ipcRenderer.send("launch-google-login");
    },

    handleLogout() {
      console.info("Need to add this functionality");
    }
  }
};
</script>

<style lang="sass" scoped>

.quillWrapper
  width: 100%;
  height: 100vh;

// .q-editor
//   flex: 1 1 100%;
//   height: calc(100vh - 150px) !important;
</style>
