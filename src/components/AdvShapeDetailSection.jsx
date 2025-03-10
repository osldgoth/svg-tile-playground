import PropTypes from 'prop-types';

const AdvShapeDetailSection = ({attribute, label, pathHTML, polyHTML, handleEditCoordLeft, handleEditCoordRight, editDeleteButtons, shape}) => {
  return (
  <section name={label} value={attribute}>
    <h5>{label}</h5>
    <p id='shapeData' >
      {attribute}=
      <button type="button" className="d-none btn btn-secondary btn-xs" onClick={() => handleEditCoordLeft(shape.toLowerCase())}>Left</button>
      &apos;
      { pathHTML.length ? pathHTML: null }
      { polyHTML.length ? polyHTML: null }
      &apos;
      <button type="button" className="d-none btn btn-secondary btn-xs" onClick={() => handleEditCoordRight(shape.toLowerCase())}>Right</button>
      {editDeleteButtons}
    </p>
  </section>
  )
}

AdvShapeDetailSection.propTypes = {
  attribute: PropTypes.string,
  label: PropTypes.string,
  pathHTML: PropTypes.array,
  polyHTML: PropTypes.array,
  handleEditCoordLeft: PropTypes.func,
  handleEditCoordRight: PropTypes.func,
  editDeleteButtons: PropTypes.element,
  shape: PropTypes.string
}

export default AdvShapeDetailSection