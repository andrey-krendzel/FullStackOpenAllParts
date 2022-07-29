import userService from '../services/users'

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET_USER':
    return action.data
  case 'INIT_ALL_USERS':
    return action.data
  default:
    return state
  }}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_ALL_USERS',
      data: users
    })
  }
}

export default userReducer