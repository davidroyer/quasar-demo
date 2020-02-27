import Vue from "vue";
import Vuex from "vuex";
import { firebase, DB } from "boot/firebase";
import { vuexfireMutations, firestoreAction } from "vuexfire";

// Notes.add({
//   content: "Content for note. Hoping this works",
//   created: firebase.firestore.FieldValue.serverTimestamp()
// });

console.log("TCL: DB", DB);
// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      notes: []
    },

    mutations: vuexfireMutations,

    actions: {
      init: firestoreAction(context => {
        return context.bindFirestoreRef("notes", DB.collection("notes"));

        // context.bindFirestoreRef("config", config);
        // context.bindFirestoreRef("todos", currentTodos);
        // context.bindFirestoreRef("tweets", db.collection("tweets"));
        // context.bindFirestoreRef("moments", db.collection("moments"));
      }),

      bindNotesRef: firestoreAction(context => {
        // context contains all original properties like commit, state, etc
        // and adds `bindFirestoreRef` and `unbindFirestoreRef`
        // we return the promise returned by `bindFirestoreRef` that will
        // resolve once data is ready
        console.log("FROM ACTION", DB.collection("notes"));

        return context.bindFirestoreRef("notes");
      })
    },

    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
