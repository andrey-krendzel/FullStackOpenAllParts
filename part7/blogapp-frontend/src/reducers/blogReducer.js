import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deletedBlogFilter(state, action){
      const id = action.payload
      //const blogToDelete = state.find(b => b.id === id)
      return state.filter(blog => blog.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { setBlogs, appendBlog, deletedBlogFilter } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }}

export const createBlog = blogObject =>
{
  return async dispatch => {

    const newBlog = await blogService.createBlog(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) =>
{
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deletedBlogFilter(id))
  }
}

export const likeBlog = (blogObject, id) => {
  return async dispatch => {
    await blogService.updateBlog(id, blogObject)
    const updatedBlogs = await blogService.getAll()
    dispatch(setBlogs(updatedBlogs))
  }
}

export default blogSlice.reducer