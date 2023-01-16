<template>
  <q-page class="flex flex-center">

    <div v-if="lists.length == 0" class="q-pa-md ">
      <h1 class="text-h1 text-weight-bold text-accent q-ma-xl flex flex-center">
        Hello 👋
      </h1>
      <hr>
      <h2 class="text-h2 text-weight-thin text-dark q-ma-lg flex flex-center">Tu n’as aucune liste de tâches pour le moment, crées en une en cliquant </h2 >
      <h2 class="text-h2 text-weight-thin text-dark q-ma-lg flex flex-center">sur le bouton ci-dessous dans le menu pour débuter</h2>
      <div class="flex flex-center q-ma-xl">
        <q-btn
        label="Ajouter une liste"
        outline
        color="accent"
        style="border-radius: 10px;"
        size="1.5rem"
        @click="createDialog = true"
        />
      </div>
    </div>

    <div v-else>
        <h1 class="text-h1 flex flex-center text-weight-bold text-accent q-ma-xl">
          Hello 👋
        </h1>
        <hr>
        <h2 class="text-h2 flex flex-center text-weight-thin text-dark q-ma-xl">Voici les dernières tâches que tu as ajoutés</h2 >
        <div class="flex flex-center q-ma-xl">
          <q-btn  label=" + Ajouter une liste" outline color="accent" style="border-radius: 10px;" size="1.5rem" @click="createDialog = true" />
        </div>
          <hr>
          <div class="card" v-for="(list,index) in lists" :key="index">
            <q-card flat bordered class="my-card bg-grey-3 q-ma-lg" style="border-radius: 10px; min-height: 3rem; min-width: 20rem;">
              <q-card-section >
                <div  style="border-radius: 10px;" class="flex flex-center">
                  <div style="min-height: 3rem" class="col">
                    <div class="text-h3 q-mt-lg">{{ list.title }}</div>
                  </div>
                  <div class="col-auto ">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable>
                            <q-item-section @click="redirectWithParams(list._id)">Voir</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section @click="openUpdateDialog(list)">Modifier</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section class="text-red-10" @click="openDeleteDialog(list)">Supprimer</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />

              <q-card-actions class="column bg-white">
                <div v-if="list.tasks && list.tasks.length > 0 ">
                  <div v-for="(task, index) in list.tasks" :key="index">
                    <div class="text-h3 text-weight-medium q-ma-md float-left text-accent">
                      {{ task.title }}
                      <hr class="q-mb-md">
                    </div>
                  </div>
                </div>
                <div v-else>
                    <h4 class="text-h4 text-weight-light text-dark q-ma-lg text-accent">Cette liste ne contient aucune tâches ajoutez en une depuis la liste</h4 >
                </div>
                <div class="q-ma-xs">
                  <q-btn label="Voir ma liste" class="q-ma-lg" @click="redirectWithParams(list._id)" style="border-radius: 10px; " size="1.2rem" color="accent" />
                </div>
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <!-- Create list dialog -->
          <q-dialog v-model="createDialog" persistent>
            <q-card style="min-height: 235px; min-width: 380px; border-radius: 10px;">
              <q-card-section>
                <div class="text-h4 flex flex-center">Créer une liste</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <p class="text-h6">Nom de la liste</p>
                <q-input label="Ex : Courses" class="text-h6" dense v-model="oneList.title" outlined autofocus @keyup.enter="createDialog = false" />
              </q-card-section>
              <q-card-actions class="text-primary flex flex-center">
                <q-btn flat class="text-h6" color=accent label="Annuler" v-close-popup />
                <q-btn color="accent" class="text-h6" style="border-radius: 10px;" label="Ajouter une liste" v-close-popup @click="createOneList" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Update list dialog -->
          <q-dialog v-model="updateDialog" persistent>
            <q-card style="min-height: 235px; min-width: 380px; border-radius: 10px;">
              <q-card-section>
                <div class="text-h4 flex flex-center">Modifier une liste</div>
              </q-card-section>
              <q-card-section class="q-pt-none">
                <p class="text-h6">Nom de la liste</p>
                <q-input class="text-h6" dense v-model="selectedList.title" outlined autofocus @keyup.enter="updateDialog = false" />
              </q-card-section>

              <q-card-actions class="text-primary flex flex-center">
                <q-btn flat class="text-h6" color=accent label="Annuler" v-close-popup />
                <q-btn color="accent" class="text-h6" style="border-radius: 10px;" label="Modifier la liste" v-close-popup @click="updateOneList(selectedList._id)" />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- Delete list dialog -->
          <q-dialog v-model="deleteDialog" persistent>
            <q-card style="min-height: 214px; min-width: 380px; border-radius: 10px;">
              <q-card-section>
                <div class="text-h4 flex flex-center text-weight-medium q-mb-lg">Supprimer une liste</div>
              </q-card-section>
              <q-card-section class="q-pt-none flex flex-center">
                <p class="text-h6">Vous êtes sur le point de supprimer votre <br/>liste êtes vous sûr de vouloir faire ça ?</p>
              </q-card-section>
              <q-card-actions class="text-primary flex flex-center">
                <q-btn flat class="text-h6 q-mr-md" color="dark" label="Annuler" v-close-popup />
                <q-btn color="red-9" class="text-h6 q-ml-md" style="border-radius: 10px;" label="Supprimer" @click="deleteOneList(selectedList._id)" v-close-popup/>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-page>

      </template>

<script setup>
import { Notify } from 'quasar'
import { useListStore } from 'src/stores/list-store'
import { ref, onMounted } from 'vue'
import { deleteList, createList, updateList } from '../../services/lists'
import { useRouter } from 'vue-router'

const listStore = useListStore()
const router = useRouter()
const lists = ref([])
const loading = ref(false)
const createDialog = ref(false)
const updateDialog = ref(false)
const deleteDialog = ref(false)
const selectedList = ref({})

const redirectWithParams = (id) => {
  router.push({ name: 'task', params: { id } })
}

const oneList = ref({
  title: ''
})

const openUpdateDialog = (list) => {
  updateDialog.value = true
  selectedList.value = Object.assign({}, list)
}
const openDeleteDialog = (list) => {
  deleteDialog.value = true
  selectedList.value = list
}

const createOneList = async () => {
  loading.value = true
  try {
    await createList(oneList.value)
    location.reload()
  } catch (err) {
    Notify.create('Error during creation of list', err)
    console.log(err)
  }
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  try {
    const allLists = await listStore.getAllLists()
    lists.value = allLists.data
    console.log(allLists.data)
  } catch (err) {
    Notify.create('Error during loading of list', err)
    console.log(err)
  }
  loading.value = false
})

const deleteOneList = async (id) => {
  try {
    await deleteList(id)
    location.reload()
    console.log('delete List ' + id)
  } catch (error) {
    Notify.create('Error during deleting list')
    console.log(error)
  }
}

const updateOneList = async (id) => {
  try {
    console.log('update list ' + id)
    await updateList(id, { title: selectedList.value.title })
    location.reload()
  } catch (error) {
    Notify.create('Error during update list')
    console.log(error)
  }
}

</script>
