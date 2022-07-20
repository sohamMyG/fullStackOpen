import { useState } from 'react'
import {
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'
import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create-new'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>
   
  )
}

const Notification = ({noti}) => {
  if(noti===''){
    return <></>
  }
  else {
    return <div>
      {noti}
    </div>
  }
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null
  console.log(anecdote)
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const createNoti = (noti) => {
    setNotification(noti)
    setTimeout(()=>{
      setNotification('')
    },5000)
  }
  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification noti={notification} />
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/create-new' element={<CreateNew addNew={addNew} createNoti={createNoti}/>} />
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer />  
    </div>
  )
}

export default App
