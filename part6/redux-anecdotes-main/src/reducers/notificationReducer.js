const initialState ='important'

const notificationReducer = (state = initialState, action) => {

  switch(action.type) {
    
      case 'SET_NOTIFICATION':
        return state = action.data

      case 'REMOVE_NOTIFICATION':
        return state = ''

      default:
        return state
    }
  }

  export const notificationChange = (message) => {
    
    return {
      type: 'SET_NOTIFICATION',
      data: message
    }
  }

  export const notificationRemove = (message) => {
    
    return {
      type: 'REMOVE_NOTIFICATION'
    }
  }

  export default notificationReducer

  