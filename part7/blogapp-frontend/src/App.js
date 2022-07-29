import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'
import BlogUpdateForm from './components/BlogUpdateForm'
import Togglable from './components/Togglable'
import './App.css'
import { notificationChange, notificationRemove } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import reducer from './reducers/blogReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector(state => state.blogs)
  const [blogsFormVisible, setBlogsFormVisible] = useState(false)
  const [blogsUpdateFormVisible, setBlogsUpdateFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  // const [errorMessage, setErrorMessage] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState(0)
  const dispatch = useDispatch()

  const user = useSelector(state => state)
  console.log('user: ', user)

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notificationChange( 'wrong credentials'))
      setTimeout(() => dispatch(notificationRemove()), 5000)
    }
  }

  const handleLikeBlog = async (id) => {
    const blogObject = blogs.find((blog) => blog.id === id)
    const updatedBlogObject = { ...blogObject, likes: blogObject.likes +1 }
    dispatch(likeBlog(updatedBlogObject, id))
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()


    try {
      const blogObject = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        //id: Math.random()
      }

      //const newBlog =
      dispatch(createBlog(blogObject))
      //reducer.setBlogs(blogs.concat(newBlog))

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      dispatch(notificationChange( `Added a new blog. Title: ${blogObject.name} Author: ${blogObject.author}`))
      setTimeout(() => dispatch(notificationRemove()), 5000)
      setBlogsFormVisible(false)
    } catch (exception) {
      dispatch(notificationChange(exception.message))
      setTimeout(() => dispatch(notificationRemove()), 5000)
    }
  }

  const handleUpdateBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: blogLikes,
        user: user,
        //id: Math.random()
      }

      const id = blogs.find((blog) => blog.title === blogObject.title).id

      console.log('id', id)

      await blogService.updateBlog(id, blogObject)
      reducer.setBlogs(blogs.concat(blogObject))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setBlogLikes(0)
      dispatch(notificationChange( `Updated a blog. Title: ${blogObject.title} Author: ${blogObject.author}`))
      setTimeout(() => dispatch(notificationRemove()), 5000)
      setBlogsUpdateFormVisible(false)
    } catch (exception) {
      dispatch(notificationChange(exception.message))
      setTimeout(() => dispatch(notificationRemove()), 5000)
    }
  }

  const handleDeleteBlog = async (id) => {


    //await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
    //   setBlogTitle('')
    //   setBlogAuthor('')
    //   setBlogUrl('')
    //   setBlogLikes(0)

    dispatch(notificationChange(`Deleted blog with id ${id}`))
    setTimeout(() => dispatch(notificationRemove()), 5000)

  }

  const handleSortByLikes = () => {

    const numDescending = [...blogs].sort((a, b) => b.likes - a.likes)
    reducer.setBlogs(numDescending)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )

  const blogsAdd = () => {
    const hideWhenVisible = { display: blogsFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogsFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogsFormVisible(true)}>new blog</button>
        </div>

        <div style={showWhenVisible}>
          <BlogAddForm
            handleAddBlog={handleAddBlog}
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            setBlogTitle={setBlogTitle}
            setBlogAuthor={setBlogAuthor}
            setBlogUrl={setBlogUrl}
          />
          <button onClick={() => setBlogsFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogsUpdate = () => {
    const hideWhenVisible = { display: blogsUpdateFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogsUpdateFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogsUpdateFormVisible(true)}>
            update blog
          </button>
        </div>

        <div style={showWhenVisible}>
          <BlogUpdateForm
            handleUpdateBlog={handleUpdateBlog}
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            blogLikes={blogLikes}
            setBlogTitle={setBlogTitle}
            setBlogAuthor={setBlogAuthor}
            setBlogUrl={setBlogUrl}
            setBlogLikes={setBlogLikes}
          />
          <button onClick={() => setBlogsUpdateFormVisible(false)}>
            cancel
          </button>
        </div>
      </div>
    )
  }

  const blogsList = () => {

    return (
      <div>
        <p>
          <b>{user.name}</b> logged-in
          <button
            onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}
          >
          Log out
          </button>
        </p>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Url</th>
            <th>
            Likes{' '}
              <button onClick={() => handleSortByLikes()}>Sort by Likes</button>
            </th>
          </tr>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} handleDeleteBlog={handleDeleteBlog} handleLikeBlog={handleLikeBlog}/>
          ))}
        </table>
      </div>
    )}

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {blogsList()} <br /> {blogsAdd()} <br />
          {blogsUpdate()}
        </div>
      )}
      <br/>
      <br/>
      <Togglable buttonLabel="just for exercise, serves no purpose">
        <p>no purpose text</p>
      </Togglable>
    </div>
  )
}

export default App
