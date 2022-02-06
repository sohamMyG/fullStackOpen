import React from "react";

const PersonForm = ({handleNumChange,handleNameChange,handleSubmit,newNum,newName}) => { 
    return( 

    <form onSubmit={handleSubmit}>
        <div>
        name: <input
            value={newName} 
            onChange={handleNameChange}
            />
        </div>
        <div>
        number: <input
            value={newNum} 
            onChange={handleNumChange}
            />
        </div>
        <div>
        <button type="submit" >add</button>
        </div>
    </form>
    )
}


export default PersonForm