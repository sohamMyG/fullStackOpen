const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
    {
		title: "title 1",
		author: "Soham maji",
		url: "https://reactpatterns.com/",
		likes: 3
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Mr. Edsger",
		url: "https://fullstackopen.com/en/part4/",
		likes: 11
	},
	{
		title: "Canonical string reduction",
		author: "Alberto Einstenio",
		url: "https://www.freecodecamp.org/news/technical-blogging-basics/",
		likes: 7
	}
]

const nonExistingId = async () => {
    const blog = new Blog({title:'lorem',author:'ipsum',url:'https://google.com',likes:0})
    await blog.save()
    await blog.remove()
	
    return blog._id.toString()
}

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async()=>{
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId , blogsInDb, usersInDb
}