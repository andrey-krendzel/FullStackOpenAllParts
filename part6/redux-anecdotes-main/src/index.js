import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'
import { notificationChange } from './reducers/notificationReducer'

import App from './App'


import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({  
  anecdotes: anecdoteReducer,  
  notifications: notificationReducer
})

const store = createStore(reducer)



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
