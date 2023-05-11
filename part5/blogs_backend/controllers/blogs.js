const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  //set blog variable to data in the request body
  const blog = new Blog(request.body)

  //use middleware tokenExtractor/userExtractor and set userId in request
  const user = await User.findById(request.userId)

  //add current users id to blogs user field
  blog.user = user.id

  //save blog to DB and add new saved blog's id to users array of blogs
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  //set blog variable to the blog in DB that matches the id in parameters
  const blog = await Blog.findById(request.params.id)

  //error if blog's user field doesn't match userId from request object(use tokenExtractor/userExtractor to set the userId)
  //if failed, either current user doesn't match the user of the blog trying to be deleted or a token wasn't recieved
  if (blog.user.toString() !== request.userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  //find blog in DB that matches the id in parameters
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = new Blog(request.body)

  // RESTRICT LIKES TO ONLY INPUT BLOG USER //
  // //set blog variable to data in the request body
  // const blog = await Blog.findById(request.params.id)

  // //error if blog's user field doesn't match userId from request object(use tokenExtractor/userExtractor to set the userId)
  // //if failed, either current user doesn't match the user of the blog trying to be deleted or a token wasn't recieved
  // if (blog.user.toString() !== request.userId) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }

  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: updatedBlog.likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(savedBlog)
})

module.exports = blogsRouter
