import React, {useContext} from 'react'
import ShapeSwitch from './ShapeSwitch'
import { Context } from "./SVGContext"

const SVGForm = ({uuidv4, handleFormSubmission, handleShapeChange}) => {
  const {SVG} = useContext(Context)
  const shapes = ["Rect", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']
  return (
    <form className='svgForm' onSubmit={handleFormSubmission}>
        <select name="" id="" onChange={handleShapeChange} defaultValue="none">
          <option id={uuidv4()} key={uuidv4()} value="none" disabled>Select a shape</option>
          {shapes.map((shape) => {
            return (
            <option id={uuidv4()} key={uuidv4()} value={shape === "Rectangle" ? "rect" : shape.toLowerCase()}>
              {shape} 
            </option>)
          })}
        </select>
        console.log(shape.name)
        <ShapeSwitch shape={SVG.name}/>
        
        {/* for path */}
        <select>
          <option value={"M"}>M</option>
          <option value={"M"}>L</option>
          <option value={"M"}>Q</option>
          <option value={"M"}>C</option>
          <option value={"M"}>T</option>
          <option value={"M"}>S</option>
        
        </select>
        {/* stroke, fill, stroke-width */}
        <button type='submit' className='submit-svg-form'>Create SVG</button>
      </form>
  )
}

export default SVGForm