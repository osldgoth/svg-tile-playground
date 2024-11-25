import PropTypes from 'prop-types'
import {useState, createContext} from 'react'
//import {v4 as uuidv4} from 'uuid'

const Context = createContext()

const SVGContextProvider = (props) => {
  const [shapeName, setShapeName] = useState("")
  const [allSVGs, setAllSVGs] = useState([])
  const [attributes, setAttributes] = useState({})
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

SVGContextProvider.propTypes = {
  children: PropTypes.element
};

export {SVGContextProvider, Context}