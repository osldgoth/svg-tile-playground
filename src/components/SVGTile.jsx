import PropTypes from 'prop-types';
import React, { useContext } from 'react'
import { Context } from "./SVGContext"
import { handleEdit, handleDelete, getShapeData } from './SVGTileUtils.js'

const SVGTile = ({index, svgData}) => {
  const { inputData, defaultShape, setShapeName,
    allSVGs, setAllSVGs,
    setInputData, setProcessedData,
    setBasic } = useContext(Context)

  const shapeName = svgData.shapeName
  const shapeNameLowerCase = shapeName.toLowerCase()
  let createdShape = null;

  const shapeData = getShapeData(shapeName, inputData, svgData )
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
    <section name={`${shapeName}-${index}`}>
      <div className="card" data-allsvgs-index={index}>
        <div className="card-header">
          <h2>{shapeName}</h2>
          {index >= 0 ? <i className="bi bi-pencil-square" data-index={index} onClick={ (event) => handleEdit(event, setAllSVGs, allSVGs, setShapeName, setInputData, setProcessedData, setBasic)}></i> : <></>}
          {index >= 0 ? <i className="bi bi-x-octagon" data-index={index} onClick={ (event) => handleDelete(event, setAllSVGs)}></i> : <></>}
        </div>
        <div className="card-body" style={{margin: 'auto'}}>
          {currentsvg}
        </div>
      </div>
      </section>
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