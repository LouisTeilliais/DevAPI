import { api } from 'src/boot/axios'

export const getTaskByList = (id) => {
  return api.get(`/tasks/lists/${id}`)
}

export const createTask = (params) => {
  return api.post('/tasks', params)
}

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`)
}

export const updateTask = (id, params) => {
  return api.put(`/tasks/${id}`, params)
}
