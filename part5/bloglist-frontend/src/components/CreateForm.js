const CreateForm = ({ newBlog, setNewBlog, createNewBlog }) => {
  const handleNewBlog = async event => {
    event.preventDefault()
    createNewBlog(newBlog)
    event.target.reset()
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleNewBlog}>
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
