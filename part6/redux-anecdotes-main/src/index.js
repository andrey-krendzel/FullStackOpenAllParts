import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import App from './App'

import anecdoteService from './services/anecdotes'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'

import notificationReducer from './reducers/notificationReducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))


const reducer = combineReducers({  
  anecdotes: anecdoteReducer,  
  notifications: notificationReducer
})

const store = createStore(reducer, composedEnhancer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
