import React from "react";
import CountryInfo from "./CountryInfo";
import Country from "./Country";

const Countries = ({countries})=> {
    let render
    
    if(countries.length>10){
      render= <div>Too many matches, specify another filter</div>
    }
    else if(countries.length===1){
      render = <CountryInfo country={countries[0]}/>
    }
    else{
      render =<div>
        {countries.map(c => <Country key={c.name.common} country={c} />)}
      </div>
    } 
      
    return render
}

export default Countries