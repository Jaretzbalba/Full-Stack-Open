const blog = require('../models/blog')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.length === 0
    ? null
    : blogs.reduce((fav, item) => {
        return fav.likes > item.likes ? fav : item
      })
}

const mostBlogs = blogs => {
  if (blogs.length > 0) {
    let count = {}
    blogs.map(item => {
      count[item.author] ? count[item.author]++ : (count[item.author] = 1)
    })

    return Object.entries(count).reduce((highest, [author, count]) => {
      return highest.count > count ? highest : { author, count }
    })
  }
  return null
}

const mostLikes = blogs => {
  if (blogs.length > 0) {
    let count = {}
    blogs.map(item => {
      count[item.author]
        ? (count[item.author] += item.likes)
        : (count[item.author] = item.likes)
    })

    return Object.entries(count).reduce((highest, [author, likes]) => {
      return highest.likes > likes ? highest : { author, likes }
    })
  }
  return null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
