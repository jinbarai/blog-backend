const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const brcypt = require('bcrypt')
const User = require('../models/user')
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
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog list can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogsToDelete = blogsAtStart[0]
  console.log(blogsToDelete)

  await api
    .delete(`/api/notes/${blogsToDelete.id}`)
    .expect(404)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  expect(blogsAtEnd).toHaveLength(2)
  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).not.toContain(blogsToDelete.title)
})


describe('when there is one initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await brcypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'jin.barai',
      name: 'Jin Barai',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('adding new blogs', async () => {
    const newBlo = helper.newBlog()
    const response = await api
      .post('/api/blogs', newBlo)
      .send(newBlo)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect (response.body.title==='JIN')
    const newBlogs = helper.blogsInDb()
    expect (newBlogs.length).toHaveLength(helper.initialBlogs.length + 1)

    const contents = newBlogs.map(n => n.title)
    expect(contents).toContain('JIN')
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })
})

afterAll(() => {
  mongoose.connection.close()
})
