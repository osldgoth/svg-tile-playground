import React, {useState, createContext} from 'react'
const Context = createContext()

const SVGContextProvider = (props) => {
  const [SVG, setSVG] = useState({})
  const [allSVGs, setAllSVGs] = useState([])

  return (
    <Context.Provider value={{SVG, setSVG, allSVGs, setAllSVGs}}>
      {props.children}
    </Context.Provider>
  )
}

export {SVGContextProvider, Context}