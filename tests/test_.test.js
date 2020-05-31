const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})
  console.log('cleared')
  let blogObject = {}
  for (var i=0; i<helper.initialBlogs.length; i++) {
    blogObject = new Blog(helper.initialBlogs[i])
    await blogObject.save()
    console.log('saved')
  }
  console.log('done')
})


test('blog list are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('there are two blog lists', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const b = '121231'
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    //.get(`/api/blogs/${b}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog list can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogsToDelete = blogsAtStart[0]

  await api
    .delete(`/api/notes/${blogsToDelete.id}`)
    .expect(404)

  const blogsAtEnd = await helper.blogsInDb()

  // expect(blogsAtEnd).toHaveLength(
  //   helper.initialBlogs.length - 1
  // )

  expect(blogsAtEnd).toHaveLength(2)
  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).not.toContain(blogsToDelete.title)
})

/*
test('adding new blogs', async () => {
  const newBlog = helper.newBlog()
  const response = await api
    .post('api/blogs', newBlog)
    .expect(200)
  expect (response.body.title==='JIN')
  //const newBlogs = helper.blogsInDb
  //expect (newBlogs.length).toHaveLength(helper.initialBlogs.length + 1)
})
*/

afterAll(() => {
  mongoose.connection.close()
})
