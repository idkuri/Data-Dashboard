import React from "react"
import { ComposableMap, Geographies, Geography, Annotation } from "react-simple-maps"

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export default function MapChart() {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      <Annotation
        subject={[-95.7129, 37.0902]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 3,
          strokeLinecap: "round"
        }}
      >
        <text x="45" y="-15" textAnchor="end" alignmentBaseline="middle" fill="#F53">
          {"49x Breweries"}
        </text>
      </Annotation>

      <Annotation
        subject={[-7.3055, 53.7798]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 3,
          strokeLinecap: "round"
        }}
      >
        <text x="45" y="-15" textAnchor="end" alignmentBaseline="middle" fill="#F53">
          {"1x Breweries"}
        </text>
      </Annotation>
    </ComposableMap>
  )
}
