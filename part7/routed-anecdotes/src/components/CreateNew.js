// import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        'content':content.value,
        'author':author.value,
        'info':info.value,
        votes: 0
      })
      props.createNoti(`a new anecdote ${content.value} created!`)
      navigate('/')
    }

    const reset = (e) => {
      e.preventDefault()
      content.reset()
      author.reset()
      info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.attr} />
          </div>
          <div>
            author
            <input {...author.attr} />
          </div>
          <div>
            url for more info
            <input {...info.attr} />
          </div>
          <button onClick={reset}>reset</button>
          <button type="submit">create</button>
          
        </form>
      </div>
    )
  
  }

  export default CreateNew