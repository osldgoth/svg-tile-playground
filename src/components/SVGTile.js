
import React from 'react'

const SVGTile = ({ currentSVG }) => {
  const { svg, shapeName, attributes } = currentSVG;



  return (
    <div className="card">
      <div className="card-header">
        <h2>{shapeName}</h2>
        <i className="bi bi-x-octagon"></i>
        <i className="bi bi-pencil-square"></i>
      </div>
      {svg}
    </div>
  );
}

export default SVGTile