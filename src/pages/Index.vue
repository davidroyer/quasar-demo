<template>
  <q-page class="flex flex-center">
    <VueEditor ref="vEditor" v-model="content" use-markdown-shortcuts />
    <q-btn color="primary" icon="add" label="New Note" @click="addNote" />
    <div v-for="note in notes" :key="note.id">
      {{ note.id }}
    </div>
  </q-page>
</template>

<script>
import Quill from "quill";
console.log("TCL: Quill", Quill);
import { VueEditor } from "vue2-editor";
import { firebase, DB } from "boot/firebase";
const Notes = DB.collection("notes");

export default {
  name: "PageIndex",

  components: { VueEditor },

  data: () => ({
    content: ""
  }),

  computed: {
    notes() {
      return this.$store.state.notes;
    }
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
        // the space character is consumed by this handler
        // so we only need to delete the hyphen
        // this.quill.deleteText(range.index - 1, 1);
        // apply bullet formatting to the line
        // quill.format("list", "unchecked", Quill.sources.USER);
        // this.quill.formatLine(range.index, 1, "list", "ordered");
        // restore selection
        // this.quill.setSelection(range.index - 1);

        // console.log(context.prefix) would print '-'
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

    // quill.keyboard.addBinding(
    //   {
    //     key: "2",
    //     shortKey: true
    //   },
    //   (range, context) => {
    //     console.log("2", context);
    //     if (context.format.header) quill.format("header", 0);
    //     else quill.format("header", 2);
    //   }
    // );
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

.quillWrapper
  width: 100%;
  height: 100vh;

// .q-editor
//   flex: 1 1 100%;
//   height: calc(100vh - 150px) !important;
</style>
