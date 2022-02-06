import React from "react"

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    const msg = {
      color: message.colour,
      fontSize: 20,
      padding: '10px 10px',
      margin : '10px 10px',
      border : `3px solid ${message.colour}`,
      borderRadius : "4px",
      backgroundColor : 'lightGray'
    }
  
    
  
    return (
      <div style={msg}>
        {message.msg}
      </div>
    )
}

export default Notification