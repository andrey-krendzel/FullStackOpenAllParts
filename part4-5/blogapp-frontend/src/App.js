import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'
import BlogUpdateForm from './components/BlogUpdateForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogsFormVisible, setBlogsFormVisible] = useState(false)
  const [blogsUpdateFormVisible, setBlogsUpdateFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState(0)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      setErrorMessage('wrong credentials')
      console.log('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setErrorMessage(
        `Added a new blog. Title: ${blogObject.name} Author: ${blogObject.author}`
      )
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setBlogsFormVisible(false)
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
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

      await blogService.update(id, blogObject)
      setBlogs(blogs.concat(blogObject))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setBlogLikes(0)
      setErrorMessage(
        `Updated a blog. Title: ${blogObject.title} Author: ${blogObject.author}`
      )
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      setBlogsUpdateFormVisible(false)
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleDeleteBlog = async (id) => {




    console.log('id', id)

    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
    //   setBlogTitle('')
    //   setBlogAuthor('')
    //   setBlogUrl('')
    //   setBlogLikes(0)
    setErrorMessage(
      `Deleted blog with id ${id}`
    )
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)

  }

  const handleSortByLikes = () => {

    const numDescending = [...blogs].sort((a, b) => b.likes - a.likes)
    setBlogs(numDescending)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
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
            <Blog key={blog.id} blog={blog} handleDeleteBlog={handleDeleteBlog}/>
          ))}
        </table>
      </div>
    )}

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {blogsList()} <br /> {blogsAdd()} <br /> {blogsUpdate()}
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
