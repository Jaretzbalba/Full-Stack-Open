const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

let token = ''

beforeAll(async () => {
  const testUser = { username: 'testUser', password: 'password' }
  await api.post('/api/users').send(testUser)
  const responseLogin = await api.post('/api/login').send(testUser)
  token = responseLogin.body.token
}, 30000)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Test on saved blog list:', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are returned with correct length', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog has an id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('Test on saved blog post:', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Newest Blog',
      author: 'Newest Author',
      url: 'www.NewestUrl.com',
      likes: 100,
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('Newest Blog')
  })

  test('default likes property set to 0', async () => {
    const newBlog = {
      title: 'Newest Blog',
      author: 'Newest Author',
      url: 'www.NewestUrl.com',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const newstBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(newstBlog.likes).toBe(0)
  })

  test('blog without title or url is not added', async () => {
    const newBlog = {
      author: 'Newest Author',
      likes: 100,
    }

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'https://test.org/',
      likes: 1,
    }

    const postResponse = await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)

    const blogToDelete = postResponse.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('a blog can be updated', async () => {
    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'https://test.org/',
      likes: 1,
    }

    const postRes = await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)

    const blogToUpdate = postRes.body
    console.log(blogToUpdate)

    const newLikes = {
      likes: blogToUpdate.likes++,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('authorization', `Bearer ${token}`)
      .send(newLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(newLikes.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
