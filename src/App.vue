<template>
  <div id="q-app">
    <pre v-if="user">{{ user }}</pre>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    user: {}
  }),
  /**
   * You have to use `return` here
   */
  preFetch({ store }) {
    return store.dispatch("init");
  },

  mounted() {
    if (this.$q.localStorage.getItem("token")) {
      const { refresh_token } = this.$q.localStorage.getItem("token");
      console.log("mounted -> refresh_token", refresh_token);
      this.$q.electron.ipcRenderer.send("handle-token-refresh", refresh_token);
    }
    this.$q.electron.ipcRenderer.on("auth-success", (event, payload) => {
      console.log("GOT AUTH INFO", payload);
      this.getUserInfo(payload.access_token);
      this.$q.localStorage.set("token", payload);

      console.log(
        "test localstorage user ->",
        this.$q.localStorage.getItem("user")
      );
    });
  },

  methods: {
    async getUserInfo(accessToken) {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const user = await response.json();
      this.user = user;
      this.$q.localStorage.set("user", user);
    }
  }
};
</script>
