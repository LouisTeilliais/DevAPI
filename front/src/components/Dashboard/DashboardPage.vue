<template>
  <q-page class="flex flex-center">

    <div class="q-pa-md ">
        <h1 class="text-h1 text-weight-bold text-accent q-ma-lg ">
        Hello 👋
        </h1>
        <br>
        <br>
        <h2 class="text-h2 text-weight-thin text-dark q-ma-lg">Tu n’as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter</h2 >
        <q-btn label="Créer une liste" size="1.5rem" color="accent" @click="dialogCreate" />
        <q-dialog></q-dialog>
    </div>
  </q-page>

</template>

<script setup>
import { useQuasar } from 'quasar'

const quasar = useQuasar()

const dialogCreate = () => {
  quasar.dialog({
    title: 'Créer une liste',
    message: 'Nom de la liste',
    prompt: {
      model: '',
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  })
}

</script>
