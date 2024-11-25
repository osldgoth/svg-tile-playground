import {useContext} from 'react'
import { Context } from "./SVGContext"
import PropTypes from 'prop-types'

const MIN = 0
const MAX = 378

const LabelInput = ({parameter, label, isrequired, command, shapeName}) => { 
  //FYI: sometimes command is a shapeName (rect, cir, etc) and other times it is a path command (a, m, l, ect)
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
      <label htmlFor={inputID}>{label}</label>
      <input id={inputID} type='number' min={MIN} max={MAX} 
             required={isrequired}
             onChange={event => handleAttributeChange(event, parameter, command)}
             value={attributes[command]?.[parameter] || ''}
             placeholder={`min ${MIN} to max ${MAX}`}
      />
    </div>
  )
}

LabelInput.propTypes = {
  parameter: PropTypes.string,
  label: PropTypes.string,
  isrequired: PropTypes.string,
  command: PropTypes.string,
  shapeName: PropTypes.string
};

export default LabelInput