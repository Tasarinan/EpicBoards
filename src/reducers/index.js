import { combineReducers } from 'redux'

import appSettings from './appSettings'
import epics from './epics'
import globalUi from './globalUi'

const rootReducer = combineReducers({
  appSettings,
  epics,
  globalUi,
})

export default rootReducer
