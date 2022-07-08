import { useState, useEffect } from 'react'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    },[])

    const handleLogin = async (e) => {
        e.preventDefault()
        if(!(password && username)){
            setErrorMessage({ message:'Username or password missing',type:'alert' })
            setTimeout(() => {
                setErrorMessage(null)
            },5000)
            return
        }
        try{
            const user = await loginService.login({
                username,password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.setToken)
            setUser(user)
            setPassword('')
            setUsername('')
            // console.log(user)
        }
        catch(exception){
            setErrorMessage({ message:'Invalid credentials',type:'alert' })
            setTimeout(() => {
                setErrorMessage(null)
            },5000)
        }

    }

    const handleCreate = async(e,obj) => {
        e.preventDefault()
        try{
            const newBlog = await blogService.create({
                title:obj.title, author:obj.author, url:obj.url
            })
            setBlogs(blogs.concat(newBlog))
            obj.setTitle('')
            obj.setAuthor('')
            obj.setUrl('')
            setErrorMessage({ message:'Blog created',type:'msg' })
            setTimeout(() => {
                setErrorMessage(null)
            },5000)
        }
        catch(exception){
            console.log(e)
            setErrorMessage({ message:'Blog creation failed',type:'alert' })
            setTimeout(() => {
                setErrorMessage(null)
            },5000)
        }
    }


    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const updateBlog = async(blog) => {


        const updatedBlog = await blogService.update(blog.id,{ ...blog,likes:blog.likes+1 })

        setBlogs(blogs.map(blog => blog.id===updatedBlog.id? updatedBlog:blog))
    }

    const removeBlog = async(blog) => {
        if(window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)){
            const newBlogs = blogs.filter(b => blog.id!==b.id)
            setBlogs(newBlogs)
            await blogService.deleteBlog(blog.id)
        }

    }

    if(user === null){
        return(
            <div>
                <h2>Log in to App</h2>
                <Notification errorMessage={errorMessage} />
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <div>{user.name} logged in <button type='submit' onClick={handleLogout}>log out</button></div>
            <Notification errorMessage={errorMessage} />
            <Togglable buttonLabel="new blog">
                <BlogForm handleCreate={handleCreate}/>
            </Togglable>
            <Blogs blogs={blogs} updateBlog={updateBlog} removeBlog={removeBlog} username={user.username}/>
        </div>
    )
}

export default App
