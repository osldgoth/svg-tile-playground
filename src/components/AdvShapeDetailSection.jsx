import PropTypes from 'prop-types';

const AdvShapeDetailSection = ({attribute, label, pathHTML, polyHTML, handleEditCoordLeft, handleEditCoordRight, editDeleteButtons, shape}) => {
  return (
  <section name={label} value={attribute}>
    <h5>{label}</h5>
    <p id='shapeData' >
      {attribute}=
      <i className="d-none bi bi-box-arrow-in-left" onClick={() => handleEditCoordLeft(shape.toLowerCase())}></i>
      &apos;
      { pathHTML.length ? pathHTML: null }
      { polyHTML.length ? polyHTML: null }
      &apos;
      <i className="d-none bi bi-box-arrow-in-right" onClick={() => handleEditCoordRight(shape.toLowerCase())}></i>
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