import PropTypes from 'prop-types';
import React, { useContext } from 'react'
import { Context } from "./SVGContext"

const SVGTile = ({index, svgData, handleDelete, handleEdit}) => {
  const {inputData, defaultShape} = useContext(Context)
  const shapeName = svgData.shapeName
  const shapeNameLowerCase = shapeName.toLowerCase()
  let createdShape = null;
  const getShapeData = () => {
    if(shapeName === "Path") {
      const pathOrFallback = /* SVGPath ||  */svgData.processedData.SVGPath
      return pathOrFallback ? {d: pathOrFallback} : {}
    }
    if(shapeName.includes('Poly')) {
      const polyOrFallback = /* SVGPoly ||  */svgData.processedData.SVGPoly
      return polyOrFallback ? {points: polyOrFallback} : {} 
    }
    return svgData.basic || inputData[shapeName.toLowerCase()] || {} 
  }

  const shapeData = getShapeData()
  const finalData = Object.keys(shapeData).length ? shapeData : defaultShape

  if (shapeNameLowerCase.trim() !== '') { // in the very first case when the page is first loaded (or reloaded)
    createdShape = React.createElement(shapeNameLowerCase,
      {
         ...finalData,
        fill: "none",
        strokeWidth: 2,
        stroke: "grey",
        strokeOpacity: '0.5'
      }
    )
  }
  
  const currentsvg = React.createElement('svg', 
    {
      width: 400,
      height: 400,
      viewBox:"0 0 400 400",
      style:{border: "solid blue 1px"}
    },
    createdShape 
  )

  return (
    <div className="card" data-allsvgs-index={index}>
      <div className="card-header">
        <h2>{shapeName}</h2>
        {handleDelete ? <i className="bi bi-pencil-square" data-index={index} onClick={handleEdit}></i> : <></>}
        {handleEdit ? <i className="bi bi-x-octagon" data-index={index} onClick={handleDelete}></i> : <></>}
      </div>
      <div className="card-body">
        {currentsvg}
      </div>
    </div>
  );
}

SVGTile.propTypes = {
  index: PropTypes.number,
  shapeName: PropTypes.string,
  svgData: PropTypes.object,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func
};

export default SVGTile