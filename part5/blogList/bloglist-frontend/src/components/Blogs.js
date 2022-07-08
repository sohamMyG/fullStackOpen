import Blog from './Blog'

const Blogs = ({ blogs,updateBlog,removeBlog,username }) => {
    // console.log(blogs)
    blogs.sort((a,b) => b.likes-a.likes)
    return (
        <div> {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} username={username}/>
        )}</div>
    )
}

export default Blogs