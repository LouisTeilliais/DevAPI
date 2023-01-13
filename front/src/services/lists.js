import { api } from 'boot/axios'

export const getAllLists = () => {
  return api.get('/lists')
}

export const getListById = () => {
  return api.get('/lists/:id')
}

export const deleteList = () => {
  return api.delete('/list/:id')
}

export const createList = () => {
  return api.post('/list')
}
