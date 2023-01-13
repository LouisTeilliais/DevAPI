import { api } from 'boot/axios'

export const getAllLists = () => {
  return api.get('/lists')
}

// export const getListById = () => {
//   return api.get('/lists/:id')
// }

export const deleteList = (id) => {
  return api.delete('/lists/' + id)
}

export const createList = () => {
  return api.post('/list')
}
