import React, {useState, useEffect} from "react"
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps"

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export default function MapChart() {
  const [data, setData] = useState(null)
  const [listCountry, setlistCountry] = useState([])
  const gpsCoords = {
    "United States": [-95.7129, 37.0902],
    "Ireland": [-7.3055, 53.7798]
  }


    async function getData() {
      const response = await fetch("https://api.openbrewerydb.org/v1/breweries")
      const jsonData = await response.json()
      setData(jsonData)
      let country = {}
      for (let i of jsonData) {
        if (!(i.country in country)) {
          country[i.country] = 1
        }
        else {
          country[i.country]++
        }
      }

      setlistCountry(country)
    }


    function renderAnnotations() {
      return Object.keys(listCountry).map((item, key) => (
        <Annotation
          key={key}
          subject={[gpsCoords[item][0], gpsCoords[item][1]]} // Fix the subject calculation
          dx={-90}
          dy={-30}
          connectorProps={{
            stroke: "#FF5533",
            strokeWidth: 3,
            strokeLinecap: "round"
          }}
        >
          <text x="45" y="-15" textAnchor="end" alignmentBaseline="middle" fill="#F53">
            {listCountry[item] + "x Breweries"}
          </text>
        </Annotation>
      ));
    }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log(listCountry)
  }, [listCountry])
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {renderAnnotations()}
    </ComposableMap>
  )
}
