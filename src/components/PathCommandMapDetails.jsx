import PropTypes from 'prop-types';
import PathParametersMapDetails from './PathParametersMapDetails'
import FlagMapDetails from './FlagMapDetails'

const PathCommandMapDetails = ({pathCommands, shape, closePathCoordinates, inputData, processedData, MIN, MAX, zCoords, handlers}) => {
  const renderPathCommands = pathCommands.map(({command, name, parameters: pathParameters, flags}, commandIndex) => {
    const editIndex = processedData["bg-primary-subtle"]

    const addCommandDataText = inputData[command] 
    ? 
    Object.values(handlers.sortByAttributeOrder(handlers.verifyArcFlags(inputData[command] || {}, command))).join(", ") 
    :
    ''
    
    const commandInputButtonText = editIndex > 0 || editIndex === 0 && command === 'M'
    ?
    `Replace at index ${editIndex}: ${command} ${addCommandDataText}`
    :
    `Add ${command} ${addCommandDataText}`

    const randomParameters = command === 'A' ? pathParameters.concat(flags) : pathParameters
    
    return (
      <div className="card col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3" id={`${command}`} key={`${command}-${name}-${commandIndex}`} >
        <div className="card-header">
          <h6>
            {name}
          </h6>
        </div>
        <div className="card-body" key={ `${shape}-${command}-${commandIndex}` }>
          <PathParametersMapDetails 
            pathParameters = { pathParameters }
            command = { command }
            shape = { shape }
            closePathCoordinates = { closePathCoordinates }
            MIN = { MIN }
            MAX = { MAX }
            inputData = { inputData }
            handleAttributeChange = { handlers.handleAttributeChange }
            />          
          {command === 'A' && // integrate into paramaters
          <FlagMapDetails
            flags = { flags }
            command = { command }
            inputData = { inputData }
            handleCheckedChange = { handlers.handleCheckedChange }
          />}
        </div>
        <div className="card-footer">
          {command === 'Z' ?
          <div>
            <button type='button' id='Z-Command' onClick={() => handlers.handleZCommand()}>Add {command} </button> Returns to {zCoords}
          </div>
          : 
          <div>
            <button type='button' id='pathRandom' onClick={() => handlers.handleRandomInput(shape.toLowerCase(), command, randomParameters)}>Random</button>
            <button type='button' id='commandInput' onClick={() => handlers.addPathCoordinateData(command, editIndex) }>
            {commandInputButtonText}
            </button>
          </div>
          }
        </div>
      </div>
    )
  })

  return <>{renderPathCommands}</>
}

PathCommandMapDetails.propTypes = {
  pathCommands: PropTypes.array,
  shape: PropTypes.string,
  closePathCoordinates: PropTypes.object,
  inputData: PropTypes.object,
  processedData: PropTypes.object,
  MIN: PropTypes.number,
  MAX: PropTypes.number,
  zCoords: PropTypes.string,
  handlers: PropTypes.object
}

export default PathCommandMapDetails