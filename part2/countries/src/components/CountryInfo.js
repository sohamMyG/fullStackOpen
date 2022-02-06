import axios from "axios";
import React,{useEffect,useState} from "react";
import Weather from "./Weather";

const CountryInfo = ({country}) => {
  const[weather,setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const capital=country.capital
  
  useEffect(()=> {
    
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
    .then((response)=>{
      setWeather(response.data)
      
    })
  },[])
  
  return(
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map((lang)=>{
          return <li key={lang}>{country.languages[lang]}</li>
        }
        )}
      </ul>
      <img src={country.flags.png} alt="flag"></img>
      <h3>Weather in {capital}</h3>
      <Weather weather={weather}/>
      {/* <div>temperature: {weather.main.feels_like} Celcius</div> */}
    </div>
  )
}

export default CountryInfo