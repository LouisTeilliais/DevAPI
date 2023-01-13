import { defineStore } from 'pinia'
// import { LocalStorage, SessionStorage } from 'quasar'
import { getAllLists } from 'src/services/lists'

export const useListStore = defineStore('lists', {
  state: () => ({
    lists: {}
  }),
  actions: {
    // eslint-disable-next-line space-before-function-paren
    async getAllLists() {
      try {
        const lists = await getAllLists()
        console.log(lists)
        return lists
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})
