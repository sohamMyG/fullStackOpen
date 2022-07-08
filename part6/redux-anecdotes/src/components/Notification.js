import { useSelector } from "react-redux"

const Notification = () => {
  // const dispatch = useDispatch()
  const notification = useSelector(state=> state.notification)

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

export default Notification