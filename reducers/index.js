import { combineReducers} from 'redux'

import authReducer from './authReducer'
import { resourceReducer } from './resourceReducers'
import { history } from './history'

const rootReducer = combineReducers({authReducer, resourceReducer, history})
export default rootReducer