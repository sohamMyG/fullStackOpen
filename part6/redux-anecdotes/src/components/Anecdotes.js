import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notiReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    
    const handleClick = () =>{
        dispatch(updateVote(anecdote))
        dispatch(setNotification(`Vote added. ${anecdote.votes+1} votes now`,5))
    }
    
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    
    return(
        <div>
            {anecdotes
                .slice()
                .filter(anecdote=>anecdote.content.toLowerCase().includes(filter))
                .sort((a,b)=> b.votes-a.votes)
                .map(anecdote =>
                <Anecdote 
                    key={anecdote.id}
                    anecdote={anecdote}
                    />
            )}
        </div>
    )
}

export default Anecdotes