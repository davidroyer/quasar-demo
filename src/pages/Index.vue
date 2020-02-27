<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" icon="add" label="New Note" @click="addNote" />
    <q-editor v-model="content" min-height="5rem" />
    <div>{{ notes }}</div>
  </q-page>
</template>

<script>
import { firebase, DB } from "boot/firebase";
const Notes = DB.collection("notes");

export default {
  name: "PageIndex",

  data: () => ({
    content: ""
  }),

  computed: {
    notes() {
      return this.$store.state.notes;
    }
  },

  methods: {
    addNote() {
      if (!this.content) return alert("No Content To Save");
      Notes.add({
        content: this.content,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.q-editor
  flex: 1 1 100%;
  height: calc(100vh - 150px) !important;
</style>
