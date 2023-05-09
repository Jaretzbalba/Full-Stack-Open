import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      showMessage('error', `wrong username or password`)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createNewBlog = async newBlog => {
    try {
      await blogService.create(newBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setNewBlog({
        title: null,
        author: null,
        url: null,
      })
      showMessage(
        'sucess',
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
    } catch (error) {
      showMessage('error', `error while saving new blog`)
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
          <ul>
            {blogs.map(blog => (
              <li key={blog.id}>
                <Blog blog={blog} />
              </li>
            ))}
          </ul>

          <CreateForm
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            createNewBlog={createNewBlog}
          />
        </div>
      )}
    </div>
  )
}

export default App
