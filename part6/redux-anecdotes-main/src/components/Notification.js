import { useSelector, useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const handleClick = () => {
    if (notification === 'important'){
      dispatch(notificationChange('non-important'))
    } else {
      dispatch(notificationChange('important'))
    }
  }

  return (
    <div style={style}>
      {notification}
      <button onClick={() => handleClick()}>Change to non-important</button>
    </div>
  )
}

export default Notification