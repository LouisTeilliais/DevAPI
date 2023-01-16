import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'
import { getAllLists, getListById } from 'src/services/lists'
import { getTaskByList } from 'src/services/tasks'

export const useListStore = defineStore('lists', {
  state: () => ({
    lists: {}
  }),
  actions: {
    // eslint-disable-next-line space-before-function-paren
    async getAllLists() {
      try {
        const lists = await getAllLists()
        return lists
      } catch (error) {
        throw new Error(error)
      }
    },
    // eslint-disable-next-line space-before-function-paren
    async getListById(id) {
      const res = await getListById(id)
      return res.data
    },
    // eslint-disable-next-line space-before-function-paren
    async getTaskByList(id) {
      try {
        const tasksByList = await getTaskByList(id)
        return tasksByList
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})
