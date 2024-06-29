import React, {useState, createContext} from 'react'
//import {v4 as uuidv4} from 'uuid'

const Context = createContext()

// const defaultsvg = React.createElement(
//   'svg', 
//   {id: uuidv4(), width: 378, height: 378, style:{border: "solid pink 1px"}}//, key: uuidv4()
// )
const defaultAttributes = {
  "d":[],
  "points":[],
  "poly": {}
}
const SVGContextProvider = (props) => {
  const [shapeName, setShapeName] = useState("")
  const [allSVGs, setAllSVGs] = useState([])
  const [attributes, setAttributes] = useState(defaultAttributes)
  //const [currentSVG, setCurrentSVG] = useState(defaultsvg) //not used?
  //const [Command, setCommand] = useState("")
  //const [coordinateData, setcoordinateData] = useState('')

  return (
    <Context.Provider value={
      {
        shapeName, setShapeName, 
        //currentSVG, setCurrentSVG, 
        allSVGs, setAllSVGs, 
        attributes, setAttributes, 
        //Command, setCommand,
        //coordinateData, setcoordinateData
      }
    }>
      {props.children}
    </Context.Provider>
  )
}

export {SVGContextProvider, Context}