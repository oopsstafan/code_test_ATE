import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import thunk from 'redux-thunk'


import {saveMovieListReducer} from './reducers/save_movieList_reducer'

export default createStore(saveMovieListReducer, composeWithDevTools(applyMiddleware(thunk)))