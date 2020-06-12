const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "Wow blog",
    "author": "JIn Barai",
    "url": "test.com",
    "likes": 5,
    "userId": "5ee0d65ca8e4008ffa26fe42"
  },
  {
    "title": "Testing",
    "author": "Testing",
    "url": "test.com",
    "likes": 1,
    "userId": "5ee0d65ca8e4008ffa26fe42"
  }
]
const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const newBlog = () => {
  return {
    "title": "JIN",
    "author": "BARAI",
    "url": "WOHO",
    "likes": 13131,
    "userId": "5edd43548d3d46861c15d10e"
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  newBlog,
  usersInDb
}