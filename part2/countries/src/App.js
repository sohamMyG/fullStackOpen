import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  
  const [countries,setCountries]=useState([]);
  const [filterCountries,setFilterCountries]=useState(countries)

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
      
    })
  }, [])

  const handleFilterChange = (e) => {
    
    const search = e.target.value.toUpperCase()
    const newCountries = countries.filter((p)=>
      p.name.common.toUpperCase().includes(search)
    )
    setFilterCountries(newCountries)

  }
  
  return <div>
    <Filter handleFilterChange={handleFilterChange}/>
    <Countries countries={filterCountries} />
  </div>
  
}

export default App