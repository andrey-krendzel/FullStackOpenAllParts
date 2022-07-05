const initialState ='important'

const notificationReducer = (state = initialState, action) => {

  switch(action.type) {
    
      case 'SET_NOTIFICATION':
        return state = action.data

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

  export default notificationReducer

  