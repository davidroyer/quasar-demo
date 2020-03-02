<template>
  <q-page class="flex flex-center">
    <VueEditor
      v-if="note"
      ref="vEditor"
      v-model="note.content"
      use-markdown-shortcuts
    />
  </q-page>
</template>

<script>
import Quill from "quill";
import { VueEditor } from "vue2-editor";
import { firebase, DB } from "boot/firebase";
const Notes = DB.collection("notes");

export default {
  name: "Note",

  // eslint-disable-next-line vue/no-unused-components
  components: { VueEditor },

  data: () => ({
    note: {},
    content: ""
  }),

  watch: {
    // call again the method if the route changes
    $route: "setNote"
  },

  mounted() {
    this.setNote();
  },

  methods: {
    setNote() {
      const id = this.$route.params.id;
      const storeNotes = this.$store.state.notes;
      console.log("setNote -> storeNotes", storeNotes);
      console.log("setNote -> id", id);
      const activeNote = storeNotes.find(note => note.id === id);
      console.log("setNote -> activeNote", activeNote);
      this.note = { ...activeNote };
    },

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

.quillWrapper
  width: 100%;
  height: 100vh;
</style>
