import PropTypes from 'prop-types';
import React from 'react'

const SVGTile = ({index, shapeName, attributes, handleDelete, handleEdit}) => {
  shapeName = shapeName.toLowerCase()
  let shape = null;
  const {d: path = [], points = []} = attributes
  const d = path.join(' ')
  if (typeof shapeName === 'string' && shapeName.trim() !== '') {
    shape = React.createElement(shapeName, 
      {
        ...attributes[shapeName],
        d,
        points,
        fill: "none",
        strokeWidth: 1,
        stroke: "red"
      }
    )
  }
  
  const currentsvg = React.createElement('svg', 
    {
      width: 378,
      height: 378,
      viewBox:"0 0 400 400",
      style:{border: "solid blue 1px"}
    },
    shape
  )

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>{shapeName}</h2>
          {handleDelete ? <i className="bi bi-pencil-square" data-index={index} onClick={handleEdit}></i> : <></>}
          {handleEdit ? <i className="bi bi-x-octagon" data-index={index} onClick={handleDelete}></i> : <></>}
        </div>
        <div className="card-body">
          {currentsvg}
        </div>
      </div>
    </div>
  );
}

SVGTile.propTypes = {
  index: PropTypes.number,
  shapeName: PropTypes.string,
  attributes: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
};

export default SVGTile