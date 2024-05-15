import React from 'react'

const SVGTile = ({index, uuidv4, currentSVG , handleDelete, handleEdit}) => {
  const { svg, shapeName, attributes } = currentSVG;



  return (
    <div className="container">
      <div className="card" id={uuidv4()} key={uuidv4()} >
        <div className="card-header">
          <h2>{shapeName}</h2>
          <i className="bi bi-pencil-square" data-index={index} onClick={handleEdit}></i>
          <i className="bi bi-x-octagon" data-index={index} onClick={handleDelete}></i>
        </div>
        <div className="card-body">
          {svg}
        </div>
      </div>
    </div>
  );
}

export default SVGTile