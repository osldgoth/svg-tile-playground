import React, {useContext} from 'react'
import ShapeSwitch from './ShapeSwitch'
import { Context } from "./SVGContext"

const SVGForm = ({uuidv4, handleFormSubmission, handleShapeChange}) => {
  const {SVG} = useContext(Context)
  const shapes = ["Rectangle", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']

  return (
    <form className='svgForm' onSubmit={handleFormSubmission}>
        <select name="" id="" onChange={handleShapeChange} defaultValue="none" value={SVG.shapeName}>
          <option id={uuidv4()} key={uuidv4()} value="none" disabled>Select a shape</option>
          {shapes.map((shape) => {
            return (
            <option id={uuidv4()} key={uuidv4()} value={shape === "Rectangle" ? "rect" : shape.toLowerCase()}>
              {shape} 
            </option>)
          })}
        </select>
        <ShapeSwitch shape={SVG.shapeName}/>
        
        {/* stroke, fill, stroke-width */}
        <button type='submit' className='submit-svg-form'>Create SVG</button>
      </form>
  )
}

export default SVGForm