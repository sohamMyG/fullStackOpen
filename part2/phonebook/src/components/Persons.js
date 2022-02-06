import React from "react";

const Persons = ({persons,handleDelete,filter}) => {
  console.log(persons,filter)
  const filterPersons = persons.filter((p)=>
      p.name.toUpperCase().includes(filter)
    )
  return(
    <div> 
      {
        filterPersons.map((p)=> { 
          return <div key={p.name}>
              {p.name} {p.number} <button  onClick={handleDelete}
                  name={p.name} value={p.id}> 
                 delete 
              </button>
            </div>
        })
      }  
    </div>
  )
}
export default Persons