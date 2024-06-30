import React, {useContext} from 'react'
import { Context } from "./SVGContext"

const MIN = 0
const MAX = 378

const LabelInput = ({parameter, label, isrequired, command}) => { 
  const { attributes, setAttributes} = useContext(Context) //currentSVG, setCurrentSVG, shapeName, setAllSVGs, allSVGs, setShapeName,, coordinateData
  command = command.toLowerCase()

  const inputID = parameter + ' ' + command

  const handleAttributeChange = (event, parameter, command) => {
    event.preventDefault()
    setAttributes(({d = [], points = [], ...rest}) => (
      {
        "d": d,
        "points": points,
        ...rest,
        [command]: {
          ...rest[command],
          [parameter]: event.target.value
        }
        
      })
    )
  }

  return (
    <div>
      <label htmlFor={parameter}>{label}</label>
      <input id={inputID} type='number' min={MIN} max={MAX} 
             required={isrequired}
             onChange={event => handleAttributeChange(event, parameter, command)}
             value={attributes[command]?.[parameter] || ''}
             placeholder={`min ${MIN} to max ${MAX}`}
      />
    </div>
  )
}

export default LabelInput