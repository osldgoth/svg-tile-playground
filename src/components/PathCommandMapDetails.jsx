import PropTypes from 'prop-types';
import PathParametersMapDetails from './PathParametersMapDetails'
import FlagMapDetails from './FlagMapDetails'

const PathCommandMapDetails = ({pathCommands, shape, closePathCoordinates, inputData, MIN, MAX, zCoords, handlers}) => {
  const renderPathCommands = pathCommands.map(({command, name, parameters: pathParameters, flags}, commandIndex) => { 
    return (
      <div className="card" id={`${command}`} key={`${command}-${name}-${commandIndex}`}>
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
          <FlagMapDetails
            flags = { flags }
            command = { command }
            inputData = { inputData }
            handleCheckedChange = { handlers.handleCheckedChange }
          />
        </div>
        <div className="card-footer">
          {command === 'Z' ?
          <div>
            <button type='button' id='Z-Command' onClick={() => handlers.handleZCommand()}>Add {command} </button> Returns to {zCoords}
          </div>
          : 
          <div>
            <button type='button' id='pathRandom' onClick={() => handlers.handleRandomInput(shape.toLowerCase(), command, pathParameters)}>Random</button>
            <button type='button' id='commandsInput' onClick={() => handlers.addPathCoordinateData(command) }>
              Add {command} {inputData[command] ? Object.values(handlers.sortByAttributeOrder(handlers.verifyArcFlags(inputData[command] || {}, command))).join(", ") : ''}
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
  MIN: PropTypes.number,
  MAX: PropTypes.number,
  zCoords: PropTypes.string,
  handlers: PropTypes.object
}

export default PathCommandMapDetails