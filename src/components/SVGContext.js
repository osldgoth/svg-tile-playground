import React, {useState, createContext} from 'react'
const Context = createContext()

const SVGContextProvider = (props) => {
  const [shapeName, setShapeName] = useState("")
  const [allSVGs, setAllSVGs] = useState([])
  const [attributes, setAttributes] = useState({})
  const [currentSVG, setCurrentSVG] = useState(null)

  return (
    <Context.Provider value={{shapeName, setShapeName, currentSVG, setCurrentSVG, allSVGs, setAllSVGs, attributes, setAttributes}}>
      {props.children}
    </Context.Provider>
  )
}

export {SVGContextProvider, Context}