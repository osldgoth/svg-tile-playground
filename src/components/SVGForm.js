import React, {useContext} from 'react'
import ShapeSwitch from './ShapeSwitch'
import { Context } from "./SVGContext"

const SVGForm = ({uuidv4, handleFormSubmission, handleShapeChange}) => {
  const {shapeName} = useContext(Context)
  const shapes = ["Rectangle", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']
  return (
    <form id={uuidv4()} className='svgForm' onSubmit={handleFormSubmission}>
        <select name="" id="" onChange={handleShapeChange} value={shapeName}>
          <option id={uuidv4()} key={uuidv4()} value="" disabled>Select a shape</option>
          {shapes.map((shape) => {
            return (
            <option id={uuidv4()} key={uuidv4()} value={shape === "Rectangle" ? "rect" : shape.toLowerCase()}>
              {shape} 
            </option>)
          })}
        </select>
        <ShapeSwitch shape={shapeName}/>

        <button type='submit' className='submit-svg-form'>Create SVG</button>
        
      </form>
      
  )
}

export default SVGForm