<template>
  <q-page class="flex flex-center">
    <div>
      <div class="flex q-mb-lg">
        <q-btn outline label="<" color="accent" to="/dashboard" class="q-mr-lg" style="height: 50px; width: 50px;"/>
        <h1 class="text-h1 text-weight-regular">{{ list.title }}</h1>
      </div>
      <hr>
      <q-btn class="text-h1 q-my-xl" label=" + Ajouter une tâche" outline color="accent" style="border-radius: 10px;" size="1.5rem" @click="createDialog = true"/>

      <h2 class="text-h2 text-weight-light q-mb-lg">
        Tâches
      </h2>
      <hr>
      <div v-for="(task, index) in tasks" :key="index">
        <div v-if="!task.done">
          <q-card flat bordered class="flex flex-center my-card bg-grey-2 q-ma-lg" style="border-radius: 10px;">
            <q-card-section >
              <div  style="border-radius: 10px;" class="flex flex-center text-weight-light">
                <div style=" width: 740px;" class="flex">
                  <q-checkbox v-model="task.done" @click="updateDone(task)" class="q-mr-sm"/>
                  <div>
                    <h6 class="text-h6 text-weight-bold q-mb-md">{{ task.title }}</h6>
                    <h6 class="text-h6 text-weight-light">{{ task.description }}</h6>
                  </div>
                </div>
                <div class="col-auto ">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section @click="openUpdateDialog(task)">Modifier</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section class="text-red-10" @click="openDeleteDialog(task)" >Supprimer</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <h2 class="text-h2 text-weight-light q-py-lg">
        Tâches complétées
      </h2>
      <hr>
      <div v-for="(task, index) in tasks" :key="index">
        <div v-if="task.done">
          <q-card flat bordered class="flex flex-center my-card bg-grey-2 q-ma-lg" style="border-radius: 10px;">
            <q-card-section >
              <div  style="border-radius: 10px;" class="flex flex-center text-weight-light">
                <div style=" width: 740px;" class="flex">
                  <q-checkbox v-model="task.done" @click="updateDone(task)" class="q-mr-sm"/>
                  <div>
                    <h6 class="text-h6 text-weight-bold q-mb-md"><strike>{{ task.title }}</strike></h6>
                    <h6 class="text-h6 text-weight-light"><strike>{{ task.description }}</strike></h6>
                  </div>
                </div>
                <div class="col-auto ">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section @click="openUpdateDialog(task)">Modifier</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section class="text-red-10" @click="openDeleteDialog(task)" >Supprimer</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-dialog v-model="createDialog" persistent>
        <q-card style="min-height: 380px; min-width: 380px; border-radius: 10px;">
          <q-card-section>
            <div class="text-h4 flex flex-center">Créer une tâche</div>
            <hr>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p class="text-h6">Nom de la tâche</p>
            <q-input label="Ex : Acheter des patates" class="text-h6 q-mb-lg " v-model="taskModel.title" dense  outlined autofocus @keyup.enter="createDialog = false" />
            <q-input type="textarea" label="Décrivez votre tâche..." class="text-h6" v-model="taskModel.description" dense outlined autofocus @keyup.enter="createDialog = false" />
          </q-card-section>

          <q-card-actions class="text-primary flex flex-center">
            <q-btn flat class="text-h6" color=accent label="Annuler" v-close-popup />
            <q-btn color="accent" class="text-h6" style="border-radius: 10px;" label="Ajouter une tâche" v-close-popup @click="createOneTask"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- Dialog Delete -->
      <q-dialog v-model="deleteDialog" persistent>
        <q-card style="min-height: 215px; min-width: 380px; border-radius: 10px;">
          <q-card-section>
            <div class="text-h4 flex flex-center text-weight-medium q-mb-lg">Supprimer une tâche</div>
          </q-card-section>
          <q-card-section class="q-pt-none flex flex-center">
            <p class="text-h6">Vous êtes sur le point de supprimer votre <br/>tâche êtes vous sûr de vouloir faire ça ?</p>
          </q-card-section>
          <q-card-actions class="text-primary flex flex-center">
            <q-btn flat class="text-h6 q-mr-md" color="dark" label="Annuler" v-close-popup />
            <q-btn color="red-9" class="text-h6 q-ml-md" style="border-radius: 10px;" label="Supprimer" @click="deleteOneTask(selectedTask._id)" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- Dialog Delete -->
      <q-dialog v-model="updateDialog" persistent>
        <q-card style="min-height: 380px; min-width: 380px; border-radius: 10px;">
          <q-card-section>
            <div class="text-h4 flex flex-center">Modifier une tâche</div>
            <hr>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p class="text-h6">Nom de la tâche</p>
            <q-input label="Ex : Acheter des patates" class="text-h6 q-mb-lg " v-model="selectedTask.title" dense  outlined autofocus @keyup.enter="updateDialog = false" />
            <q-input type="textarea" label="Décrivez votre tâche..." class="text-h6" v-model="selectedTask.description" dense outlined autofocus @keyup.enter="updateDialog = false" />
          </q-card-section>

          <q-card-actions class="text-primary flex flex-center">
            <q-btn flat class="text-h6" color=accent label="Annuler" v-close-popup />
            <q-btn color="accent" class="text-h6" style="border-radius: 10px;" label="Modifier une tâche" v-close-popup @click="updateOneTask(selectedTask._id)"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      </div>
  </q-page>
</template>
<script setup>

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useListStore } from 'src/stores/list-store'
import { Notify } from 'quasar'
import { createTask, deleteTask, updateTask } from 'src/services/tasks'

const route = useRoute()
const tasksStore = useListStore()
const tasks = ref([])
const tasksDone = ref([])
const list = ref('')
const loading = ref(false)
const createDialog = ref(false)
const deleteDialog = ref(false)
const updateDialog = ref(false)
const selectedTask = ref({})

const taskModel = ref({
  title: '',
  description: '',
  list: route.params.id
})

const openUpdateDialog = (task) => {
  updateDialog.value = true
  selectedTask.value = Object.assign({}, task)
}

const openDeleteDialog = (task) => {
  deleteDialog.value = true
  selectedTask.value = task
}

onMounted(async () => {
  const listId = route.params.id
  const tasksByList = await tasksStore.getTaskByList(listId)
  tasks.value = tasksByList.data
  const listValue = await tasksStore.getListById(listId)
  list.value = listValue
})

const createOneTask = async () => {
  loading.value = true
  try {
    await createTask(taskModel.value)
    location.reload()
  } catch (error) {
    Notify.create('Error during creation of task')
    console.log(error)
  }
  loading.value = false
}

const deleteOneTask = async (id) => {
  try {
    await deleteTask(id)
    location.reload()
  } catch (error) {
    Notify.create('Error during deleting task')
    console.log(error)
  }
}

const updateOneTask = async (id) => {
  try {
    await updateTask(id, { title: selectedTask.value.title, description: selectedTask.value.description })
    location.reload()
  } catch (error) {
    Notify.create('Error during update list')
    console.log(error)
  }
}

const updateDone = async (task) => {
  try {
    await updateTask(task._id, { done: task.done })
    tasksDone.value = task.value
    location.reload()
  } catch (error) {
    Notify.create('Error during update list')
    console.log(error)
  }
}

</script>
