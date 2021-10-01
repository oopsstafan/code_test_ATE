import { SAVE_MOVIELIST } from "../actions.config";


const initState = []

export const saveMovieListReducer = (preState=initState, action)=>{
    const {type, data} = action
    switch (type){
        case SAVE_MOVIELIST:
            let newState = [...data]
            return newState
        default:
            return preState
    }
}