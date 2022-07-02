import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


const SingleCountryData = (props) => {
  const [weatherData, setWeatherData] = useState() 



  useEffect(() => {  
    axios
    .get('http://api.openweathermap.org/data/2.5/weather?q=' + props.country[0].capital[0] + '&APPID=' + process.env.REACT_APP_API_KEY)
    .then(response => {
      setWeatherData(response.data)
    })
  }, [])

  console.log('capital', props.country[0].capital[0])
  console.log(weatherData)
  // console.log(process.env.REACT_APP_API_KEY)
  // console.log('http://api.openweathermap.org/data/2.5/weather?q=' + props.country[0].capital[0] + '&APPID=' + process.env.REACT_APP_API_KEY)

  // let imageString = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"




 if (props.visibility === "shown"){
  return(
    <div>
      {props.country.map(country => 
        <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <p>{country.flag}</p>
        </div>
      )}
      {/* <h3>Languages</h3>
       {props.country[0].languages.map(language => <li>{language}</li>)}  */}
      <img src={props.country[0].flags.png} />
      
       {/* <h3>Weather in {weatherData.name}</h3>
      <p>Temperature {weatherData.main.temp} </p>
      <p>Wind {weatherData.wind.speed}</p>  */}
      {/*<img src={imageString} />  */}
      </div>
    
  )
  } else if (props.visibility === "hidden") {
    return(<p></p>)
  }
}

const Results = (props) => {

  if (props.countries.length > 10) {
    return(
      <p>Too many results</p>
    )
  } else if (props.countries.length > 1) {
    return(
      <p>{props.countries.map(country => <li key={country.ccn3}>{country.name.common}
      <button>show</button>
      {/* <SingleCountryData country={country} visibility="hidden" />  */}
      </li>)}</p>
    )
  } else if (props.countries.length === 1){
    return(
      <SingleCountryData country={props.countries} visibility="shown"/>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    })
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }




  return (
    <div className="App">
      <p>find</p>
      <input value={filter}
      onChange={handleFilterChange} />
      {/* <p>{countries.length > 10 ? 
      <p>Too many results</p> 
      : countries.length === 1 ?
       <SingleCountryData country={countries} /> 
       : countries.map(country => <li key={country.ccn3}>{country.name.common}</li>)}</p> */}
      <Results countries={countries} />
    </div>
  );
}

export default App;
