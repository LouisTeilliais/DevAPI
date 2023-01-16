import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: {}
  }),
  actions: {
    // eslint-disable-next-line space-before-function-paren
    // async getTaskByList
  }
})
