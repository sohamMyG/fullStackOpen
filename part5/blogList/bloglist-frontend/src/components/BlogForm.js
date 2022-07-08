import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')

    return (
        <div>
            <h2>Create new Blog</h2>
            <form onSubmit={e => handleCreate(e,{ title,setTitle,author,setAuthor,url,setUrl })}>
                <div>
                    <label>Title: </label>
                    <input
                        type="text"
                        value={title}
                        id="title"
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label>Author: </label>
                    <input
                        type="text"
                        value={author}
                        id="author"
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label>URL: </label>
                    <input
                        type="text"
                        value={url}
                        id="url"
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button id="createButton" type="submit">create</button>
            </form>

        </div>
    )
}

export default BlogForm