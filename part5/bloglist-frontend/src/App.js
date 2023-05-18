import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [refreshBlogs, setRefreshBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      return setBlogs(blogs)
    })
  }, [refreshBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const showMessage = (type, message) => {
    setMessage({ type: type, text: message })
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleLogin = async event => {
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
      showMessage('sucess', `${user.name} was successfully logged in`)
    } catch (exception) {
      showMessage('error', 'wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createNewBlog = async newBlog => {
    try {
      await blogService.create(newBlog)
      setRefreshBlogs(!refreshBlogs)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      blogFormRef.current.toggleVisibility()
      showMessage(
        'sucess',
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    } catch (error) {
      showMessage('error', 'error while saving new blog')
    }
  }

  const likesUpdate = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      setRefreshBlogs(!refreshBlogs)
      showMessage('success', 'Successfully like added')
    } catch (error) {
      showMessage('danger', error.message)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setRefreshBlogs(!refreshBlogs)
      showMessage('success', 'The blog was successfully deleted')
    } catch (error) {
      showMessage('danger', error.message)
    }
  }

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={message} />
      {!user ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <Logout
            username={user.name}
            handleLogout={handleLogout}
          />

          {blogs.map(blog => {
            return (
              <Blog
                blog={blog}
                likesUpdate={likesUpdate}
                removeBlog={removeBlog}
                user={user}
                key={blog.id}
              />
            )
          })}

          <Togglable
            buttonId='create'
            buttonLabel='new blog'
            ref={blogFormRef}
          >
            <CreateForm handleNewBlog={createNewBlog} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App
