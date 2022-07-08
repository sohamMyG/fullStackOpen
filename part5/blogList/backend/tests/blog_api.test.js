const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('when there is initially one user in db', ()=>{
	beforeEach(async()=>{
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret',10)
		const user = new User({username:'root',passwordHash})
		await user.save()

	})

	test('creation succeeds with a new username',async()=>{
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username : 'sohammyg',
			name: 'Soham Maji',
			password: 'haveyoumetted'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

		const usernames = usersAtEnd.map(user => user.username)
		expect(usernames).toContain(newUser.username)

	})

	test('creation fails with proper statuscode and message if username is already taken',async()=>{
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username : 'root',
			name: 'mikchovichk',
			password: 'watatadu'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		expect(result.body.error).toContain('username must be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)

	})

	test('creation fails when username or password is less than 3 characters',async()=>{
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username : 'sk',
			name: 'mikchovichk',
			password: 'wa'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		expect(result.body.error).toContain('username and password must be at least 3 characters long')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation fails when username or password is missing',async()=>{
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'mikchovichk',	
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		expect(result.body.error).toContain('username or password is missing')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})

describe('when there is some users and blogs in db',()=>{
	
})

afterAll(() => {
    mongoose.connection.close()
})