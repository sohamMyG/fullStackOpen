import { useSelector } from "react-redux"
import { connect } from "react-redux"

const Notification = (props) => {
  // const dispatch = useDispatch()
  const notification = props.notification

  // const setNotification = (noti) => {
  //   dispatch(setNoti(noti))
  //   setTimeout(()=>{
  //     dispatch(removeNoti())
  //   },5000)
  // }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification===null) {return}
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification:state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification