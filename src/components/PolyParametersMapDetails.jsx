import PropTypes from 'prop-types';

const PolyParametersMapDetails = ({ polyParameters, shape, MIN, MAX, inputData, processedData, handlers }) => {
  const editIndex = processedData["bg-primary-subtle"]
  const paremeterDataText = inputData[shape.toLowerCase()]
  ?
  Object.values(handlers.sortByAttributeOrder(inputData[shape.toLowerCase()] || {})).join(", ")
  :
  '';

  const parameterInputButtonText = editIndex >= 0 
  ?
  `Replace at index ${editIndex}: ${paremeterDataText}`
  :
  ` Add Coordinate ${ paremeterDataText }`;

  return (
    <div className="card" id={ shape.toLowerCase() }>
      <div className="card-header">
        <h6>
          { shape.charAt(0)}{shape.slice(1).toLowerCase() }
        </h6>
      </div>
      <div className="card-body">
        {polyParameters.map(({ parameter, label }, index) => (
          <div key={ `${shape}-${parameter}-${index}` }>
            <label>
              { label }
              <input id={ `${parameter} ${shape}` } 
                min={ MIN } max={ MAX}
                type='number'
                onChange={ event => handlers.handleAttributeChange(event, parameter, '', shape) }
                value={ inputData[shape.toLowerCase()]?.[parameter] ?? '' }
                placeholder={ `${MIN}-${MAX}` }
              />
            </label>
            { `min ${MIN} - max ${MAX}` }
          </div>
        ))}
      </div>
      <div className="card-footer">
        <button type='button' id='polyRandom' onClick={() => handlers.handleRandomInput(shape.toLowerCase(), '', polyParameters)}>Random</button>
        <button type='button' id='parameterInput' onClick={() => handlers.addPolyCoordinateData(shape, editIndex)}>
          { parameterInputButtonText } 
        </button>
      </div>
    </div>
  )
}

PolyParametersMapDetails.propTypes = {
  polyParameters: PropTypes.array,
  shape: PropTypes.string,
  MIN: PropTypes.number,
  MAX: PropTypes.number,
  inputData: PropTypes.object,
  processedData: PropTypes.object,
  handlers: PropTypes.object
} 

export default PolyParametersMapDetails