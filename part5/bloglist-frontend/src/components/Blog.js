import { useState } from 'react'

const Blog = ({ blog }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setInfoVisible(!infoVisible)
  }

  const blogStyle = {
    padding: 10,
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
          Likes {blog.likes} <button> like </button>
          <br />
          {blog.user !== undefined && blog.user.name}
          <br />
          <button> remove </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
