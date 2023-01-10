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
      </div>
      <!-- <div v-for="(list, index) in lists" :key="index">
        {{ list.title }}
      </div> -->
      <q-btn label="Get liste" size="1.5rem" color="accent" @click="getLists" />
      <div v-for="(list,index) in lists" :key="index">
        <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ list.title }}</div>
            <div class="text-subtitle2">by John Doe</div>
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
                    <q-item-section>Supprimer</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions>

      </q-card-actions>
    </q-card>
        <!-- <li>
          <h3>
            {{ list.title }}
          </h3>
        </li> -->
      </div>

  </q-page>

</template>

<script setup>
import { useQuasar, Notify } from 'quasar'
// import { useListStore } from '../../stores/list-store'
// import { useRouter } from 'vue-router'
import { getAllLists } from 'src/services/lists'
import { ref } from 'vue'

const quasar = useQuasar()
const lists = ref([])

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

const getLists = async () => {
  try {
    const res = await getAllLists()
    lists.value = res.data
    console.log(res.data)
  } catch (e) {
    Notify.create('Something went wrong with the loading of lists')
  }
}

// const handleRegister = async () => {
//   try {
//     await userStore.handleRegister(form.value)
//     router.push({ name: 'dashboard' })
//   } catch (e) {
//     Notify.create('Error during register')
//   }
// }

// const handleRegister = async () => {
//   try {
//     await userStore.handleRegister(form.value)
//     router.push({ name: 'dashboard' })
//   } catch (e) {
//     Notify.create('Error during register')
//   }
// }

</script>
