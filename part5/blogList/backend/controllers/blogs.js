const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

blogRouter.get('/', async(request, response) => {
    const blogs= await Blog.find({}).populate('user')
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})

blogRouter.post('/', async(request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if(!decodedToken.id){
        return response.status(401).json({error : 'token missing or invalid'})
    }

    const user = request.user

    if(!(body.hasOwnProperty('likes'))){
        body.likes = 0
    }
    if(!(body.title && body.url)){
        response.status(400).end() 
    }
    else{
        const blog = new Blog({
            title: body.title,
            author : body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
    
        let savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        savedBlog= await Blog.findById(savedBlog.id).populate('user')
        response.status(201).json(savedBlog)
    }
})

blogRouter.put('/:id',async(request,response)=>{
    const body = request.body
    
    const blog = {
        user: body.user.id,
        likes: body.likes,
        title: body.title,
        author : body.author,
        url: body.url,    
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id,blog,{new:true}).populate('user')
    response.status(200).json(updatedBlog)    
})

blogRouter.delete('/:id',async(request,response)=>{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({error : 'token missing or invalid'})
    }
    const blog = await Blog.findById(request.params.id)
    if(!(decodedToken.id.toString() === blog.user.toString())){
        return response.status(401).json({error: 'deletion attempted by a wrong user'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    console.log(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter