import React, {useContext} from 'react'
import { Context } from "./SVGContext"

const MIN = 0
const MAX = 378

const LabelInput = ({parameter, label, type}) => {
  const {attributes, setAttributes} = useContext(Context)
  const handleAttributeChange = (event, parameter) => {
    event.preventDefault()
    setAttributes(prevAttributes =>({
      ...prevAttributes, 
      [parameter]: event.target.value
    }))
  }

  return (
    <div>
      <label htmlFor={parameter}>{label}{parameter}</label>
      <input id={parameter} type={type} min={MIN} max={MAX} required onChange={event => handleAttributeChange(event, parameter)} value={attributes[parameter]}/>
    </div>
  )
}

export default LabelInput
//src\components\LabelInput.js