<template>
    <q-page class="flex flex-center">

    <div v-if="lists.length == 0" class="q-pa-md ">
      <h1 class="text-h1 text-weight-bold text-accent q-ma-lg ">
        Hello 👋
      </h1>
      <br>
      <br>
      <h2 class="text-h2 text-weight-thin text-dark q-ma-lg">Tu n’as aucune liste de tâche pour le moment créer en une en cliquant sur le bouton ci-dessous dans le menu pour débuter</h2 >
        <q-btn label="Créer une liste" size="1.5rem" color="accent" @click="dialogCreate" />
        <!-- <q-btn label="Get liste" size="1.5rem" color="accent" @click="getLists" /> -->
      </div>

      <div v-else>
        <h1 class="text-h1 flex flex-center text-weight-bold text-accent q-ma-lg ">
            Hello 👋
          </h1>
        <h2 class="text-h2 flex flex-center text-weight-thin text-dark q-ma-lg ">Voici les dernières tâches que tu as ajoutés</h2 >
        <div class="card" v-for="(list,index) in lists" :key="index">
          <q-card flat bordered class="my-card bg-grey-4 q-ma-lg">
            <q-card-section>
              <div class="flex flex-center">
                <div class="col">
                  <div class="text-h2">{{ list.title }}</div>
                </div>

                <div class="col-auto">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section>Voir</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Modifier</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section class="text-red-10">Supprimer</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions class="flex flex-center column bg-white">
              <h4 class="text-h4 text-dark q-ma-lg">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</h4 >
              <q-btn label="Voir liste" size="1.2rem" color="accent" />
            </q-card-actions>
          </q-card>

        </div>
        <q-btn label="Ajouter une liste" size="1.5rem" color="accent" @click="dialogCreate" />
      </div>
    </q-page>

  </template>

<script setup>
import { useQuasar, Notify } from 'quasar'
import { useListStore } from 'src/stores/list-store'
import { ref, onMounted } from 'vue'

const listStore = useListStore()

const quasar = useQuasar()
const lists = ref([])

const dialogCreate = () => {
  quasar.dialog({
    title: 'Créer une liste',
    message: 'Nom de la liste',
    prompt: {
      model: '',
      type: 'text'
    },
    cancel: true,
    persistent: true,
    square: true
  })
}

onMounted(async () => {
  try {
    const allLists = await listStore.getAllLists()
    lists.value = allLists.data
  } catch (err) {
    Notify.create('Error during loading of list', err)
    console.log(err)
  }
})

// const getTaskById = () => {

// }

// const deleteTask = () => {

// }

</script>
