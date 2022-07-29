import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {

  const response = await axios.get(baseUrl)

  return response.data
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteBlog = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, setToken, createBlog, updateBlog, deleteBlog }
