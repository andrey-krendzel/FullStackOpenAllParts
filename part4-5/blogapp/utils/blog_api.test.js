const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      id: '5a422aa71b54a676234d17f8',
      title: 'Hitler',
      author: 'EdsgeghehW. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      id: '6a422aa71b54a676234d17f8',
      title: 'Gwgawgement Considered Harmful',
      author: 'Mussolini',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 111,
      __v: 0
    }
  ]


  beforeEach(async () => {
      await Blog.deleteMany({})
      let blogObject = new Blog(helper.initialBlogs[0])
      await blogObject.save()
      blogObject = new Blog(helper.initialBlogs[1])
      await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  }, 100000)


test('the blog is about HItler', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Hitler')
})

test('correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific author has a blog', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.author)

    expect(contents).toContain('Mussolini')
})

test('id property exists', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined();
  });
  
  test('a valid blog can be added', async () => {
    const newBlog = {
      id: '6b422aa71b54a676234d17f8',
      title: 'test_blog',
      author: 'test_author',
      url: 'google.com',
      likes: 1,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
      'test_blog'
    )
  })

  test('a valid blog can be added async method', async () => {
    const newBlog = {
      id: '6b422aa71b54a676234d17f8',
      title: 'test_blog',
      author: 'test_author',
      url: 'google.com',
      likes: 1,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const title = blogsAtEnd.map(n => n.title)  
    expect(title).toContain(
      'async'
    )
  })

  test('a blog without title cannot be added', async () => {
    const newBlog = {
      id: '6b422aa71b54a676234d17f8',
      author: 'test_author',
      url: 'google.com',
      likes: 1,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]


    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)

  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { title: 'updatedtitle', author: 'updated', url:'updated', likes: 0}



    //Run update and get status 200

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

    // const blogsAtEnd = await helper.blogsInDb()

    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    // //Check that updated title is in the lsit of final blogs

    // const title = blogsAtEnd.map(r => r.title)

    // expect(title).not.toContain(blogToUpdate.title)
    // expect(title).toContain(updatedBlog.title)

  }, 100000)


afterAll(() => {
    mongoose.connection.close()
  })