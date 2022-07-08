// import { act } from "react-dom/test-utils"
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    createAnecdote(state,action) {
      state.push((action.payload))
    },
    addVote(state,action) {
      const newAnecdote = action.payload
      const id = newAnecdote.id
      return state.map(anecdote => anecdote.id === id ? newAnecdote : anecdote)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const updateVote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(content)
    dispatch(addVote(anecdote))
  }
}

// const anecdoteReducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)
//   switch(action.type) {
//     case 'ADD_VOTE':
//       const id = action.data.id
//       const anecdoteToChange = state.find(n => n.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes+1
//       }
//       return state.map(note => note.id === id ? changedAnecdote : note)
//     case 'NEW_ANEC':
//       return state.concat(action.data)
//     default:
//       return state
//   }
  
// }

// export const addVote = (id) => {
//   return {
//     type: 'ADD_VOTE',
//     data: { id }
//   }
// }

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANEC',
//     data: asObject(anecdote)
//   }
// }