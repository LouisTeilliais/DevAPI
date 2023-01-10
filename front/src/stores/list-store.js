import { defineStore } from 'pinia'
import { LocalStorage, SessionStorage } from 'quasar'
// import { register, login } from 'src/services/users'
import { getAllLists } from 'src/services/lists'

export const useListStore = defineStore('user', {
  state: () => ({
    user: {}
  }),
  getters: {

  },
  actions: {
    // eslint-disable-next-line space-before-function-paren
    getJwtToken() {
      return LocalStorage.getItem('token') || SessionStorage.getItem('token')
    },
    // eslint-disable-next-line space-before-function-paren
    async getLists() {
      const res = await getAllLists()
      console.log(res)
      LocalStorage.set('lists', res.data)
    }
    // async handleRegister(params) {
    //   try {
    //     const res = await register(params)
    //     LocalStorage.set('token', res.data.message)
    //   } catch (e) {
    //     LocalStorage.clear()
    //     throw new Error(e)
    //   }
    // },
    // // eslint-disable-next-line space-before-function-paren
    // async handleLogin(params) {
    //   try {
    //     const res = await login(params)
    //     LocalStorage.set('token', res.data.message)
    //   } catch (e) {
    //     LocalStorage.clear()
    //     throw new Error(e)
    //   }
    // }
  }
})
