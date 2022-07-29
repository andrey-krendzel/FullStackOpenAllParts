import blogService from '../services/blogs'
import loginService from '../services/login'
import { notificationChange } from './notificationReducer'

const authReducer = (state = null, action) => {
    switch (action.type) {
    case 'INIT_USER':
      return action.user
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
        return action.user
    default:
        return state
    }
}