import React, {useContext} from 'react'
import ShapeInputs from './ShapeInputs'
import { Context } from "./SVGContext"
import {v4 as uuidv4} from 'uuid'
import SVGTile from './SVGTile'

const SVGForm = () => {
  const {shapeName, setShapeName, 
         allSVGs, setAllSVGs, 
         attributes, setAttributes,
         } = useContext(Context)  
  const shapes = ["Rectangle", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']

  const handleFormSubmission = (event) => {
    event.preventDefault()
    setAllSVGs([{shapeName, attributes}, ...allSVGs]) //add new svg to beginning of array
      //reset state to defaults
    setShapeName("")
    setAttributes({})
  }

  const handleShapeChange = (event) => {
    setShapeName(event.target.value)
      //reset state to defaults
    setAttributes({//temp fix?
      a: {
        "large-arc-flag": 0,
        "sweep-flag": 0
      }})
  }
  
  return (
    <form id={uuidv4()} className='svgForm' onSubmit={handleFormSubmission}>
      <select className='mb-1' name="" id="shapeSelection" onChange={handleShapeChange} value={shapeName}>
        <option id={uuidv4()} key={uuidv4()} value="" disabled>Select a shape</option>
        {shapes.map((shape) => {
          return (
          <option id={uuidv4()} key={uuidv4()} value={shape === "Rectangle" ? "rect" : shape.toLowerCase()}>
            {shape} 
          </option>)
        })}
      </select>

      <ShapeInputs shape={shapeName.toUpperCase()}/>
      <SVGTile index={-1} shapeName={shapeName} attributes={attributes} /> {/* handleDelete={handleDelete} handleEdit={handleEdit} coordinateData={coordinateData}*/}
      {shapeName &&
        <button type='submit' className='submit-svg-form my-3'>Create SVG</button>
      }
      
    </form>
      
  )
}

export default SVGForm