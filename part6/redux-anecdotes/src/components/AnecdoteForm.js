import { connect } from 'react-redux'
import { setNotification } from '../reducers/notiReducer'
import { newAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()


    const addAnecdote = async(e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.newAnecdote(content)
        props.setNotification(`New anecdote created`,5)
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    setNotification,
    newAnecdote
}

export default connect(null,mapDispatchToProps)(AnecdoteForm)