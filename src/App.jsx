import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Table from './Components/Table'
import './App.css'
import { Link } from "react-router-dom";

function App() {
  const [data, setData] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [countryFilter, setCountryFilter] = useState([])
  const [stateFilter, setStateFilter] = useState([])
  const [cityFilter, setCityFilter] = useState([])
  const [listCountry, setlistCountry] = useState([])
  const [listState, setlistState] = useState([])
  const [listCity, setlistCity] = useState([])
  const [mode, setMode] = useState(-1) // -1 filter by non 0 filter by country 1 filter by state 2 filter by city
  const [searchQuery, setSearch] = useState("")
  const [countryBrewery, setCountryBrewery] = useState("")
  const [breweryType, setAmtBreweryType] = useState("")
  const [totalBrew, setTotalBrew] = useState(0)
  const [isSideBarOpen, setOpenSideBar] = useState(true)


  async function getData() {
    const response = await fetch("https://api.openbrewerydb.org/v1/breweries")
    const jsonData = await response.json()
    setData(jsonData)
    let states = []
    let country = []
    let city = []
    for (let i of jsonData) {
      if (!states.includes(i.state)) {
        states.push(i.state)
      }
    }
    for (let i of jsonData) {
      if (!country.includes(i.country)) {
        country.push(i.country)
      }
    }
    for (let i of jsonData) {
      if (!city.includes(i.city)) {
        city.push(i.city)
      }
    }

    setlistState(states)
    setlistCountry(country)
    setlistCity(city)
  }

  function parseData() {
    let countryHash = {};
    let typeHash = {};
    let maxCountryFrequency = 0;
    let maxTypeFrequency = 0;
    let countryWithMaxFrequency = '';
    let commonBreweryType = '';

    if (data != null) {
        setTotalBrew(data.length)
        for (let brewery of data) {
            // Count country frequencies
            if (!countryHash[brewery.country]) {
                countryHash[brewery.country] = 1;
            } else {
                countryHash[brewery.country]++;
            }
            // Count brewery type frequencies
            if (!typeHash[brewery.brewery_type]) {
                typeHash[brewery.brewery_type] = 1;
            } else {
                typeHash[brewery.brewery_type]++;
            }
        }

        for (let country in countryHash) {
            if (countryHash[country] > maxCountryFrequency) {
                maxCountryFrequency = countryHash[country];
                countryWithMaxFrequency = country;
            }
        }

        for (let brewType in typeHash) {
            if (typeHash[brewType] > maxTypeFrequency) {
                maxTypeFrequency = typeHash[brewType];
                commonBreweryType = brewType;
            }
        }
    }

    setCountryBrewery(countryWithMaxFrequency);
    setAmtBreweryType(commonBreweryType);
}


  function addToStateFilter(name) {
    if (stateFilter.includes(name)) {
      setStateFilter(stateFilter.filter(item => item !== name));
    }
    else {
      setStateFilter([...stateFilter, name])
    }

  }


  function addToCountryFilter(name) {
    if (countryFilter.includes(name)) {
      setCountryFilter(countryFilter.filter(item => item !== name));
    }
    else {
      setCountryFilter([...countryFilter, name])
    }

  }

  

  function addToCityFilter(name) {
    if (cityFilter.includes(name)) {
      setCityFilter(cityFilter.filter(item => item !== name));
    } else {
      setCityFilter([...cityFilter, name]);
    }
  }


  function renderFilterOptions() {
    let elements = []
    if (mode == 0) {
      for (let i = 0; i < listCountry.length; i++) {
        elements.push(
        <div className='filter-cell'>
          <label>{listCountry[i]}</label>
          <input key={i} type='checkbox' checked={countryFilter.includes(listCountry[i])} onClick={(e) => {e.stopPropagation()}} onChange={() => {addToCountryFilter(listCountry[i])}}/>
        </div>
        )
      }

    }
    else if (mode == 1) {
      for (let i = 0; i < listState.length; i++) {
        elements.push(
        <div className='filter-cell'>
          <label>{listState[i]}</label>
          <input key={i} type='checkbox' checked={stateFilter.includes(listState[i])} onClick={(e) => {e.stopPropagation()}} onChange={() => {addToStateFilter(listState[i])}}/>
        </div>
        )
      }

    }
    else if (mode == 2) {
      for (let i = 0; i < listCity.length; i++) {
        elements.push(
        <div className='filter-cell'>
          <label>{listCity[i]}</label>
          <input key={i} type='checkbox' checked={cityFilter.includes(listCity[i])} onClick={(e) => {e.stopPropagation()}} onChange={() => {addToCityFilter(listCity[i])}}/>
        </div>
        )
      }
      
    }
    return elements
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    parseData()
  }, [data])

  return (
    <>
      {
        isOpen && (
          <div className='filter-container' onClick={() => {setOpen(false); setMode(-1)}}>
            <div className='overlay'></div>
            <div className='filter-table' onClick={(e) => {e.stopPropagation()}}>
              {renderFilterOptions()}
            </div>
          </div>
        )
      }
      <div className='App'>
        <div className='statsContainer'>
          <div>Country with the most amount of breweries: {countryBrewery}</div>
          <div>Total number of breweries: {totalBrew}</div>
          <div>Most popular brewery type: {breweryType}</div>
        </div>
        <div className='buttonContainer'>
          <input className='searchBar' type='text' onChange={(e) => {setSearch(e.target.value)}}placeholder='Search by name'></input>
          <button onClick={() => {setOpen(true); setMode(0)}}>Filter By Country</button>
          <button onClick={() => {setOpen(true); setMode(1)}}>Filter By State</button>
          <button onClick={() => {setOpen(true); setMode(2)}}>Filter By City</button>
      </div>
      <Table data={data} cityFilter={cityFilter} countryFilter={countryFilter} stateFilter={stateFilter} searchQuery={searchQuery}></Table>
    </div>
    </>
  )
}

export default App
