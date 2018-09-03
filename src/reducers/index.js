import { combineReducers } from 'redux'

import app from './app'
import references from './references'

const rootReducer = combineReducers({
  app,
  references,
})

export default rootReducer
