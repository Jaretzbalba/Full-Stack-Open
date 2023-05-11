import { useState } from 'react'

const Blog = ({ blog, likesUpdate, removeBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const removeButtonVisible = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const toggleVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  const handleLike = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: ++blog.likes,
      user: blog.user,
    }
    likesUpdate(blog.id, blogObj)
  }

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) === true
    ) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    padding: 12,
    border: 'solid',
    borderColor: '#6c757d',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {infoVisible ? 'Hide' : 'View'}
        </button>
        <div style={showWhenVisible}>
          {blog.url}
          <br />
          Likes {blog.likes} <button onClick={handleLike}> like </button>
          <br />
          {blog.user.name}
          <br />
          {console.log(blog.user.username)}
          {console.log(user.username)}
          <button
            style={removeButtonVisible}
            onClick={handleRemove}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
