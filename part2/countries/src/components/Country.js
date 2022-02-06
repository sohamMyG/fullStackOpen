import React,{useState} from "react";
import CountryInfo from "./CountryInfo";


const Country = ({country}) => {

    
    const [showInfo,setInfo] = useState(0)

    const handleClick = (e) => {
        const showUpdate =showInfo ?  false : true
        e.target.textContent = showInfo ? "show" : "hide"
        setInfo(showUpdate)
        return 
    }

    return <div key={country.name.common}>
            <span> {country.name.common} </span> 
            <button onClick={handleClick}>show</button>
            {showInfo ? <CountryInfo country={country} />: ""}
           </div>
}

export default Country