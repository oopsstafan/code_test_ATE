import {SAVE_MOVIELIST} from './actions.config'

export const saveMovieListAction = (data)=>{
    return {type: SAVE_MOVIELIST, data}
}