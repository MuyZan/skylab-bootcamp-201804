// import React from 'react';
// import '../App.css';
// import App from '../App'
import { withRouter } from 'react-router-dom'
// import logic from '../logic'


import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

class BasicMap extends Component {
    constructor() {
        super()
        this.clicking = this.clicking.bind(this)
        
      }

    clicking(e){
        console.log("CLICK!")
        const x = e.clientX
        const y = e.clientY + window.pageYOffset
        // this.props.dispatch(
        // // show({
        // //     origin: { x, y },
        // //     content: geography.properties.name,
        // // })
        
        // )
        console.log("x > " + x + "/y > " + y + "    cntnt -> " + e.target)
        
    }

  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography="https://unpkg.com/world-atlas@1.1.4/world/110m.json">
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  onClick={this.clicking}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default BasicMap