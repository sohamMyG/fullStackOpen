const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
        response.json(blogs)
        })
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
    const reqObj = request.body
    
    if(!(reqObj.hasOwnProperty('likes'))){
        reqObj.likes = 0
    }
    if(!(reqObj.title && reqObj.url)){
        response.status(400).end() 
    }
    else{
        const blog = new Blog(reqObj)
    
        const savedBlog = await blog.save()

        response.status(201).json(savedBlog)
    }
})

blogRouter.put('/:id',async(request,response)=>{
    const body = request.body
    
    const blog = {
        title: body.title,
        author : body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id,blog,{new:true})
    await response.status(200).json(updatedBlog)    
})

blogRouter.delete('/:id',async(request,response)=>{
    await Blog.findByIdAndRemove(request.params.id)
    console.log(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter