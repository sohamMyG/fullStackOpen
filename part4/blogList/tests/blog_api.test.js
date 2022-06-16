const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map( blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())

	await Promise.all(promiseArray)
    
})

describe('initially there is some blogs saved',()=>{
	test('blogs are returned as json', async () => {
		await api
		  .get('/api/blogs')
		  .expect(200)
		  .expect('Content-Type', /application\/json/)
	},100000)
	
	test('there are three blogs', async()=> {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(3)
	})
	
	test('uniq identifier is id', async()=> {
		const response = await api.get('/api/blogs')
		const blog1 = response.body[1]
		expect(blog1.id).toBeDefined()
	})
})

describe('addition of a new note',()=>{
	test('a new blog is created after making HTTP POST request', async()=>{
		const newBlog = {
			title : 'How to write blogs',
			author : 'Blogmaster69',
			url : 'https://www.theblogstarter.com/',
			likes : 12
		}
		
		await api.post('/api/blogs').send(newBlog).expect(201)
	
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	
		const titles = blogsAtEnd.map(blog => blog.title)
		expect(titles).toContain(newBlog.title)
	
	},100000)
	
	test('if likes is missing,default to 0', async()=>{
		const newBlog = {
			title : 'How to write blogs',
			author : 'Blogmaster69',
			url : 'https://www.theblogstarter.com/'
		}
	
		const response = await api.post('/api/blogs').send(newBlog)
		expect(response.body.likes).toBe(0)
	
	})
	
	test('if title and url are missing', async()=>{
		const newBlog = {
			author: 'Sam Witwiky',
			likes:0
		}
	
		await api.post('/api/blogs').send(newBlog).expect(400)
	})
})

describe('deletion of a note',()=>{
	test('succeeds with status code 200 if id is valid',async()=>{
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api.delete(`/api/blogs/${blogToDelete.id}`)
				.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length-1)
	})
})

describe('updation of a note',()=>{
	test('likes is updated by adding 1 like',async()=>{
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]
		const beforeLikes = blogToUpdate.likes
		blogToUpdate.likes++

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(200)
		
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[0].likes).toBe(beforeLikes+1)

	})
})

afterAll(() => {
    mongoose.connection.close()
})