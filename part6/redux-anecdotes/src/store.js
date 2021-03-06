import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notiReducer from "./reducers/notiReducer";

const store = configureStore({
    reducer:{
        anecdotes: anecdoteReducer,
        notification: notiReducer,
        filter: filterReducer
    }
})

export default store