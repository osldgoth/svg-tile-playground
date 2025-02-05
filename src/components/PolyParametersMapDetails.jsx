import PropTypes from 'prop-types';

const PolyParametersMapDetails = ({polyParameters, shape, MIN, MAX, inputData, handlers}) => {
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
              <input id={ `${parameter} ${shape} ${shape}` } 
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
          <button type='button' id='parametersInput' onClick={() => handlers.addPolyCoordinateData(shape)}>Add Coordinate {Object.values(inputData[shape.toLowerCase()] || {}).join(", ")}</button>
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
  handlers: PropTypes.object
} 

export default PolyParametersMapDetails