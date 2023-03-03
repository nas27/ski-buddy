import { useState } from "react";
import { apiKey } from "../../env";
import { proxyUrl } from "../App";
import styles from './styles.module.css';


export const SearchLoc = ( { onCityFound }) => {


    const [p_code, setPCode] = useState('');    

    const getLoc = (p) => {
        console.log(p);

        const url =  proxyUrl + `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${p}&details=true`; 
        //const url =`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${p}&details=true`;
        fetch(url)
            .then(res => res.json())
            .then(res => res.find(l => l.Country.ID === 'CA'))
            .then(res => onCityFound({
                cityName: res.LocalizedName,
                key: res.Key,
                province: res.AdministrativeArea.ID,
            })); 
            setPCode('');
            
 
    };

    return (
        <div className="styles.main">
            <input
                placeholder="Enter a postal code"
                value={p_code}
                onChange={e => setPCode(e.target.value)}
            /> 
            
            <button onClick={() => getLoc(p_code)}>Search</button>
        </div>
    );
    
};  
