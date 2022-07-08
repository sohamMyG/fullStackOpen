import { useState } from 'react'

const Blog = ({ blog,updateBlog,removeBlog,username }) => {

    const [visible,setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    console.log(blog)
    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 3,
        paddingLeft: 2,
        backgroundColor : 'rgb(172 200 255)',
        border: '1px solid rgb(120 170 255)',
        marginBottom: 5
    }

    return (
        <div className='blog'>
            <div style={blogStyle}>
                <div>
                    {blog.title} {blog.author} <button onClick={() => {setVisible(!visible)}}>{visible? 'hide':'view'}</button>
                </div>
                <div style={showWhenVisible} className="togglable">
                    <div>{blog.url}</div>
                    <div>{blog.likes} <button onClick={() => {updateBlog(blog)}}>like</button></div>
                    <div>{blog.user.name}</div>
                    { blog.user.username===username &&  (<button onClick={() => {removeBlog(blog)}}>remove</button>)}
                </div>
            </div>
        </div>
    )

}

export default Blog