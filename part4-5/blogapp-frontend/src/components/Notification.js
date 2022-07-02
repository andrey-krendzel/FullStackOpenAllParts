const Notification = ({ message }) => {
  console.log(message)
  if (message === '') {
    return null
  } else {
    return <div className="success">{message}</div>
  }
}

export default Notification
