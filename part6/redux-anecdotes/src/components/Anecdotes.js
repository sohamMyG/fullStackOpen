import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote,handleClick}) => {
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
    const dispatch = useDispatch()

    
    
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
                    handleClick={() => dispatch(updateVote(anecdote))}/>
            )}
        </div>
    )
}

export default Anecdotes