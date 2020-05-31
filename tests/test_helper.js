const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Wow blog",
    "author": "JIn Barai",
    "url": "test.com",
    "likes": 5
  },
  {
    "title": "Testing",
    "author": "Testing",
    "url": "test.com",
    "likes": 1
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
  return Blog({
    "title": "JIN",
    "author": "BARAI",
    "url": "WOHO",
    "likes": 13131
  })
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  newBlog
}