import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  users: userReducer
})

const store = createStore(reducer, composedEnhancer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
