<template>
  <q-list bordered separator>
    <q-item
      v-for="note in $store.state.notes"
      :key="note.id"
      :to="`/note/${note.id}`"
      exact
    >
      <q-item-section>
        {{ note.id }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {};
</script>

<style></style>
