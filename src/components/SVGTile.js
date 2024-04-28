
import React from 'react'

const SVGTile = ({ currentSVG }) => {
  const { svg, shapeName, attributes } = currentSVG;

  return (
    <div className="svg-tile">
      <h2>{shapeName}</h2>
      {svg}
    </div>
  );
}

export default SVGTile