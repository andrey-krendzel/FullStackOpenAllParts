import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  console.log(notification.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const handleClick = () => {
    dispatch(notificationChange('default '))
    
  }

  return (
    <div style={style}>
      {notification}
      <button onClick={() => handleClick()}>Default</button>
    </div>
  )
}

export default Notification