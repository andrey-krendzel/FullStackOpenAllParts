const initialState ='important'

const notificationReducer = (state = initialState, action) => {

  switch(action.type) {
    
      case 'SET_NOTIFICATION':
        return action.data

      case 'REMOVE_NOTIFICATION':
        return state = ''

      default:
        return state
    }
  }

  export const notificationChange = (message, time) => {

      setTimeout(() => notificationRemove, time*100)
    
       return {
         type: 'SET_NOTIFICATION', 
         data: message,
         time: time
        }

    
  }

  export const notificationRemove = () => {
    
    return {
      type: 'REMOVE_NOTIFICATION'
    }
  }

  export default notificationReducer

  