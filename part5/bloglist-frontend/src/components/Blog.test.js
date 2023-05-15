import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  let component = render(
    <Blog
      blog={blog}
      user={blog.user}
    />
  )

  const div = component.container.querySelector('.detailInfo')
  expect(div).toHaveStyle('display: none')
})
