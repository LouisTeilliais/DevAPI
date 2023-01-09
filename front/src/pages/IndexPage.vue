<template>
  <q-page class="flex flex-center">
    <div class="flex column q-pr-xl">
      <h1 class="text-h1 text-weight-bold text-accent ">Ynov Task Manager</h1>
      <br>
      <br>
      <h2 class="text-h2 text-weight-thin text-dark">Essayez ce nouveau gestionnaire de tâches quotidiennes</h2>
      <br>
      <q-btn to="/login" class="q-mt-md" size="2rem" label="Commencer ici" color="accent" />
    </div>
    <img
      src="../../public/icons/header-img.png"
      style="width: 30rem; height: 30rem"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
