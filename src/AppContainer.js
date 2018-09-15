import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// Storage
import { persistStore, persistReducer } from 'redux-persist'
import createElectronStorage from 'redux-persist-electron-storage'
import { PersistGate } from 'redux-persist/integration/react'

import rootReducer from './reducers'
import App from './App'

const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

ReactDOM.render(<AppContainer />, document.querySelector('#appContainer'))
