import PropTypes from 'prop-types'
import {useState, createContext} from 'react'

const Context = createContext()

const SVGContextProvider = (props) => {
  const [shapeName, setShapeName] = useState("")
  const [allSVGs, setAllSVGs] = useState([])
  const [inputData, setInputData] = useState({})
  const [processedData, setProcessedData] = useState( {data: [], meta: {"bg-primary-subtle": -1}} )
  const [path, setPath] = useState('')
  const [poly, setPoly] = useState('')
  const [basic, setBasic] = useState('')
  const [defaultShape, setDefaultShape] = useState({})

  return (
    <Context.Provider value={
      {
        shapeName, setShapeName, 
        allSVGs, setAllSVGs,
        inputData, setInputData,
        processedData, setProcessedData,
        path, setPath,
        poly, setPoly,
        basic, setBasic,
        defaultShape, setDefaultShape
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