import { useState } from 'react'

const CreateForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: null,
    author: null,
    url: null,
  })

  const createNewBlog = async event => {
    event.preventDefault()
    handleNewBlog(newBlog)
    event.target.reset()
  }

  return (
    <div className='formDiv'>
      <h2>Create new Blog</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input
            type='text'
            id='title'
            name='title'
            onChange={({ target }) => {
              return setNewBlog({ ...newBlog, title: target.value })
            }}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            id='author'
            name='author'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type='url'
            id='url'
            name='url'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button
          className='createButton'
          id='create-button'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default CreateForm
