import PropTypes from 'prop-types';

const AdvShapeDetailSection = ({attribute, label, sectionHTML, handleEditCoordLeft, handleEditCoordRight, editDeleteIcons, shape}) => {
  return (
  <section name={label} value={attribute}>
    <h5>{label}</h5>
    <p id='shapeData'>
      {attribute}=
      <i className="d-none bi bi-box-arrow-in-left" onClick={() => handleEditCoordLeft(shape.toLowerCase())}></i>
      &apos;{sectionHTML}&apos;
      <i className="d-none bi bi-box-arrow-in-right" onClick={() => handleEditCoordRight(shape.toLowerCase())}></i>
      {editDeleteIcons}
    </p>
  </section>
  )
}

AdvShapeDetailSection.propTypes = {
  attribute: PropTypes.string,
  label: PropTypes.string,
  sectionHTML: PropTypes.array,
  handleEditCoordLeft: PropTypes.func,
  handleEditCoordRight: PropTypes.func,
  editDeleteIcons: PropTypes.element,
  shape: PropTypes.string

}

export default AdvShapeDetailSection