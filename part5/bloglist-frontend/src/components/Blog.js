import { useState } from 'react'

const Blog = ({ blog, likesUpdate }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const showWhenVisible = { display: infoVisible ? '' : 'none' }

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
          <button> remove </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
