import PropTypes from 'prop-types';

const FlagMapDetails = ({flags, command, inputData, handleCheckedChange}) => {
  const flagDetails = flags?.map(({ flag, label: flagLabel }, flagIndex) =>{//input for A:FLAGS
    return (
      <div key={ `${command}-${flag}-${flagIndex}` }>
        <label >{ flagLabel }
          <input type='checkbox'
            id={ `${flag}-${command}` } //intentional: ID here uses dash instead of a space to avoid validateElements step
            onChange={ event => handleCheckedChange(event, flag, command) }
            checked={ inputData[command]?.[flag] ? true : false }
          /> 
        </label>
      </div>
    )
  })

  return flagDetails
}

FlagMapDetails.propTypes = {
  flags: PropTypes.array,
  command: PropTypes.string,
  inputData: PropTypes.object,
  handleCheckedChange: PropTypes.func
}

export default FlagMapDetails