import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

test('<CreateForm /> updates parent state and calls onSubmit', async () => {
  const handleNewBlog = jest.fn()
  const user = userEvent.setup()

  const component = render(<CreateForm handleNewBlog={handleNewBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const button = component.container.querySelector('.createButton')

  await user.type(title, 'test-title')
  await user.type(author, 'author-title')
  await user.type(url, 'https://test-url.com')
  await user.click(button)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].title).toBe('test-title')
  expect(handleNewBlog.mock.calls[0][0].author).toBe('author-title')
  expect(handleNewBlog.mock.calls[0][0].url).toBe('https://test-url.com')
})
