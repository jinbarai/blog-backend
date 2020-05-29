const listHelper = require('../utils/list_helper')

describe('testing', () => {
  test('dummy returns one',() => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('likes', () => {
    const blogs = [{
      "title": "Kya kar lega jaanke",
      "author": "Jin Barai",
      "url": "test.com",
      "likes": 5,
      "id": "5ecd20fd0bb2ba6278263b2d"
    },
    {
      "title": "Gonna tst",
      "author": "Jin",
      "url": "test.com",
      "likes": 5,
      "id": "5ecd2334050d2d63eb74620b"
    },
    {
      "title": "Gonna tst",
      "author": "Jin",
      "url": "test.com",
      "likes": 5,
      "id": "5ecd2362dec9a963fe16613d"
    },
    {
      "title": "Kya kar lega jaanke",
      "author": "Jin Barai",
      "url": "test.com",
      "likes": 5,
      "id": "5ecd236edec9a963fe16613e"
    }]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(20)
  })})

describe('Favorite Blog', () => {
  test('favorite', () => {
    const blogs = [{
      "title": "Kya kar lega jaanke",
      "author": "Jin Barai",
      "url": "test.com",
      "likes": 5,
      "id": "5ecd20fd0bb2ba6278263b2d"
    },
    {
      "title": "Gonna tst",
      "author": "Jin",
      "url": "test.com",
      "likes": 5,
      "id": "5ecd2334050d2d63eb74620b"
    },
    {
      "title": "Gonna tst",
      "author": "Jin",
      "url": "test.com",
      "likes": 4,
      "id": "5ecd2362dec9a963fe16613d"
    },
    {
      "title": "Kya kar lega jaanke",
      "author": "Jin Barai",
      "url": "test.com",
      "likes": 7,
      "id": "5ecd236edec9a963fe16613e"
    }]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      "title": "Kya kar lega jaanke",
      "author": "Jin Barai",
      "url": "test.com",
      "likes": 7,
      "id": "5ecd236edec9a963fe16613e"
    })
  })})