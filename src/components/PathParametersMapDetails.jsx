import PropTypes from 'prop-types';

const PathParametersMapDetails = ({pathParameters, command, shape, closePathCoordinates, MAX, MIN, inputData, handleAttributeChange }) => {
  const pathParametersDetails = pathParameters?.map(({ parameter, label: parameterLabel}, parameterIndex) => {
    return (
      command === 'Z' ?
      //input for command Z
      <div key={ `${command}-${parameter}-${parameterIndex}` }>
        <span id={ `${parameter} ${command} ${shape}` }>{ parameterLabel }: { closePathCoordinates?.[parameter] ?? 'Add another command first' }</span>
      </div>
      :
      //input for commands M, L, H, V, C, S, Q, T AND A
      <div key={ `${command}-${parameter}-${parameterIndex}` }>
        <label>{ parameterLabel }
          <input id={ `${parameter} ${command} ${shape}` } 
            min={ MIN } max={ MAX}
            type='number'  
            required={ false }
            onChange={ event => handleAttributeChange(event, parameter, command, shape) }
            value={ inputData[command]?.[parameter] ?? '' }
            placeholder={ `${MIN}-${MAX}` }
          />
        </label>
      </div>
    )
  })

  return pathParametersDetails
}

PathParametersMapDetails.propTypes = {
  pathParameters: PropTypes.array,
  command: PropTypes.string, 
  shape: PropTypes.string,
  closePathCoordinates: PropTypes.object,
  MAX: PropTypes.number,
  MIN: PropTypes.number,
  inputData: PropTypes.object,
  handleAttributeChange: PropTypes.func
}

export default PathParametersMapDetails