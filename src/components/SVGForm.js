import React, {useContext} from 'react'
import ShapeSwitch from './ShapeSwitch'
import { Context } from "./SVGContext"

const SVGForm = ({handleFormSubmission, handleShapeChange}) => {
  const {SVG} = useContext(Context)
  const shapes = ["Rect", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']
  return (
    <form className='svgForm' onSubmit={handleFormSubmission}>
        <select name="" id="" onChange={handleShapeChange}>
          {shapes.map((shape) => {return (<option id={shape} value={shape === "Rectangle" ? "rect" : shape.toLowerCase()}>{shape} </option>)})}
          
          {/* 
          
          */}
            {/* 
              M x y; 
              L x y; 
              T x y; 
              H x; 
              V y; 
              C x1 y1, x2 y2, x y;
              S x2 y2, x y; 
              Q x1 y1, x y; 
              A rx ry x-axis-rotation large-arc-flag sweep-flag x y
              Z; 
            */}
            {/* 
              XY *7
              X  *1
              Y  *1
              X1,X2,Y1,Y2 *2
              RX, RY, *1
            */}
        </select>
        {/* conditional */}
        
          <ShapeSwitch shape={SVG}/>
        
        {/* for path */}
        <select>
          <option value={"M"}>M</option>
          <option value={"M"}>L</option>
          <option value={"M"}>Q</option>
          <option value={"M"}>C</option>
          <option value={"M"}>T</option>
          <option value={"M"}>S</option>
          {/* ... */}
        </select>
        {/* stroke, fill, stroke-width */}
        <button type='submit' className='submit-svg-form'>Create SVG</button>
      </form>
  )
}

export default SVGForm