import React from "react"
const Weather =({weather})=>{
    
   
    if(Object.keys(weather).length === 0){
        return null
    }

    const imgURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
    console.log(imgURL)
    return <div>
        <div>temperature: {weather.main.temp} °C</div>
        <img alt="weather" src={imgURL}></img>
        <div>wind: {weather.wind.speed} m/s</div>
    </div>
    // <div>temperature: {weather.main.feels_like} Celcius</div>
}

export default Weather