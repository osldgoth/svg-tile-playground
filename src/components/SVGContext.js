import React, {useState, createContext} from 'react'
import {v4 as uuidv4} from 'uuid'

const Context = createContext()

const SVGContextProvider = (props) => {
  const [shapeName, setShapeName] = useState("")
  const [allSVGs, setAllSVGs] = useState([])
  const [attributes, setAttributes] = useState({})
  const [currentSVG, setCurrentSVG] = useState(React.createElement(
    'svg', 
    {id: uuidv4(), key: uuidv4(), width: 378, height: 378, style:{border: "solid green 1px"}}
  ))
  const [contextCommand, setContextCommand] = useState("")
  const [coordinateDataContext, setcoordinateDataContext] = useState('')

  return (
    <Context.Provider value={
      {
        shapeName, setShapeName, 
        currentSVG, setCurrentSVG, 
        allSVGs, setAllSVGs, 
        attributes, setAttributes, 
        contextCommand, setContextCommand,
        coordinateDataContext, setcoordinateDataContext
      }
    }>
      {props.children}
    </Context.Provider>
  )
}

export {SVGContextProvider, Context}