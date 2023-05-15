import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '64040f7471b8e66910889a4d',
    title: 'test title',
    author: 'test author',
    url: 'https://test-url.com',
    likes: 1,
    user: {
      username: 'Jaret',
      name: 'Jaret',
      id: '6449f7eb137b60266ca1a192',
    },
  }

  const mockLikesHandler = jest.fn()
  const mockRemoveHandler = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        likesUpdate={mockLikesHandler}
        removeBlog={mockRemoveHandler}
        user={blog.user}
      />
    )
  })

  test('only shows title/author at start', () => {
    const div = component.container.querySelector('.detailInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('shows url/likes after show button is clicked', async () => {
    const user = userEvent.setup()
    const button = component.container.querySelector('.viewButton')
    await user.click(button)

    const div = component.container.querySelector('.detailInfo')
    expect(div).not.toHaveStyle('display: none')
  })
})
