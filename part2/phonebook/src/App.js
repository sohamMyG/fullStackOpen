import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  //{msg:'this is a msg',colour:'green'}

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
        
        
      })
  }, [])
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {name:newName , number:newNum}
    if(persons.some((p)=>p.name===newName)){
      const existingPerson = persons.find((p)=>p.name===newName)
      const id = existingPerson.id

      if(Number(existingPerson.number)===Number(newNum)){
        
        alert(`${newPerson.name} is already added to phonebook`)
      }
    
      else{
        if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
          personService
            .update(id,newPerson)
            .then(returnedPerson=>{
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
              displayMsg({msg:`${newPerson.name} has been updated`,colour:'green'})      
            })
            .catch(error => {
              displayMsg({msg:`The number failed to update.${error}`,colour:'red'})
            })
        } 
      }
    }
    else{
      personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response)) 
        displayMsg({msg:`Added ${response.name} to the phonebook`,colour:'green'})         
      })
      
    }
    setNewName("")
    setNewNum("")
    
  }

  const handleFilterChange = (e) => {
    const search = e.target.value.toUpperCase()
    setFilter(search)
    
  }

  const handleDelete = (e) => {
    
    const name = e.target.name
    const id = e.target.value
    if (window.confirm(`Delete ${name}?`)) {
      console.log(persons)
      const newPersons = persons.filter(p => {
          // console.log(typeof id,id)
          // console.log(typeof p.id,p.id)
          return p.id!==Number(id)
        }
      )
      displayMsg({msg:`${name} deleted`,colour:'red'})   
      setPersons(newPersons)
      personService.deleteNum(id)
    }   
  }

  const displayMsg = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        handleSubmit={handleSubmit}
        newNum={newNum}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} filter={filter}/>
    </div>
  )
}

export default App
