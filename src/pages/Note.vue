<template>
  <q-page class="flex flex-center">
    <VueEditor
      v-if="note"
      ref="vEditor"
      v-model="note.content"
      use-markdown-shortcuts
    />
    <q-page-sticky position="bottom-right" :offset="[12, 12]">
      <q-btn size="xl" fab icon="save" color="primary" @click="updateNote" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import Quill from "quill";
import { VueEditor } from "vue2-editor";
import { firebase, DB } from "boot/firebase";
const Notes = DB.collection("notes");

export default {
  name: "Note",

  components: { VueEditor },

  data: () => ({
    note: {},
    id: null,
    content: ""
  }),

  watch: {
    // call again the method if the route changes
    $route: "setNote"
  },
  mounted() {
    const { quill } = this.$refs.vEditor;
    console.log("TCL: created -> quill", quill);

    /** Trying to fix issue on mobile */
    quill.keyboard.addBinding(
      { key: " " },
      {
        collapsed: true,
        format: { list: false }, // ...on an line that's not already a list
        prefix: /^]$/, // ...following a '-' character
        offset: 1 // ...at the 1st position of the line,
        // otherwise handler would trigger if the user
        // typed hyphen+space mid sentence
      },
      function(range, context) {
        setTimeout(() => {
          this.quill.formatLine(range.index, 1, "list", "unchecked");
          this.quill.deleteText(range.index - 2, 2);
        }, 0);
      }
    );
    quill.keyboard.addBinding(
      {
        key: "C",
        shortKey: true,
        shiftKey: true
      },
      function(range, context) {
        if (context.format.list) {
          quill.format("list", false, Quill.sources.USER);
        } else {
          quill.format("list", "unchecked", Quill.sources.USER);
        }
        console.log("Key C-> context", context);
      }
    );

    /**
     * Toggle Checkbox State
     */
    quill.keyboard.addBinding(
      {
        key: "D",
        shortKey: true
      },
      function(range, context) {
        console.log("TCL: mounted -> context", context);
        if (!context.format.list) return;

        if (context.format.list === "unchecked") {
          quill.format("list", "checked", Quill.sources.USER);
        } else {
          quill.format("list", "unchecked", Quill.sources.USER);
        }
      }
    );

    /**
     * Heading Shortcuts
     */
    const HeadingsArray = [1, 2, 3, 4, 5, 6];

    HeadingsArray.forEach(headingValue => {
      quill.keyboard.addBinding(
        {
          key: `${headingValue}`,
          shortKey: true
        },
        (range, context) => {
          console.log(`heading - ${headingValue}`, context);
          if (context.format.header && context.format.header === headingValue)
            quill.format("header", 0);
          else quill.format("header", headingValue);
        }
      );
    });

    this.setNote();
  },

  methods: {
    setNote() {
      const id = this.$route.params.id;
      const activeNote = this.$store.state.notes.find(note => note.id === id);
      this.note = { ...activeNote };
      this.id = activeNote.id;
    },

    addNote() {
      if (!this.content) return alert("No Content To Save");
      Notes.add({
        content: this.content,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
    },

    updateNote() {
      console.log("updateNote -> this.id", this.id);
      Notes.doc(this.id).set(
        {
          content: this.note.content,
          updated: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    }
  }
};
</script>

<style lang="sass" scoped>

.quillWrapper
  width: 100%;
  height: 100vh;
</style>
