<template>
  <q-page class="flex flex-center">
    <h1>{{ $route.params.id }}</h1>
    <h2>NOTE</h2>
    {{ note }}
    <!-- eslint-disable-next-line vue/no-v-html -->
    <!-- <div v-html="note.content" /> -->
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
    note: null,
    content: ""
  }),

  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next(vm => vm.setNoteOnEnter(vm, to.params.id));
    //  next(vm => vm.setData(err, post))
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");

    this.note = null;
    this.setNote(to.params.id);
    next();

    // getPost(to.params.id, (err, post) => {
    //   this.setData(err, post);
    //   next();
    // });
  },

  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      console.log("fetchData RAN");
    },

    setNoteOnEnter(vm, id) {
      const Notes = vm.$store.state.notes;
      console.log("setNoteOnEnter -> Notes", Notes);
      const activeNote = Notes.find(note => note.id === id);
      console.log("setNoteOnEnter -> activeNote", activeNote);
      console.log("vm.note", vm.note);
      vm.note = { ...activeNote };
    },

    setNote(id) {
      const Notes = this.$store.state.notes;
      console.log("setNote -> id", id);
      const activeNote = Notes.find(note => note.id === id);
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
