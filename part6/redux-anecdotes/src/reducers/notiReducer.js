import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notiSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        setNoti(state,action){
            return action.payload
        },
        removeNoti(state,action){
            return null
        }
    }
})

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(setNoti(content))
        setTimeout(()=>{
          dispatch(removeNoti())
        },time*1000)
    }
}

export const {setNoti,removeNoti} = notiSlice.actions
export default notiSlice.reducer 