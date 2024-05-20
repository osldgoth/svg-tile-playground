import React, {useContext} from 'react'
import { Context } from "./SVGContext"

const MIN = 0
const MAX = 378

const LabelInput = ({inputkey, parameter, label, type, inputReference}) => { 
  const {currentSVG, setCurrentSVG, shapeName, setAllSVGs, attributes, allSVGs, setShapeName, setAttributes} = useContext(Context)


  const handleAttributeChange = (event, parameter) => {
    event.preventDefault()
    setAttributes(prevAttributes =>({
      ...prevAttributes, 
      [parameter]: event.target.value
    }))
  }



  return (
    <div key={inputkey}>
      <label htmlFor={parameter}>{label}</label>
      <input id={parameter} type={type} min={MIN} max={MAX} required 
             onChange={event => handleAttributeChange(event, parameter)} 
             value={attributes[parameter]}
             placeholder={`min ${MIN} to max ${MAX}`}
             ref={inputReference}/> 
    </div>
  )
}

export default LabelInput