// import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { connect } from "react-redux"

const Filter = (props) => {
    // const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter=event.target.value
        props.setFilter(filter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(null,{setFilter})(Filter)