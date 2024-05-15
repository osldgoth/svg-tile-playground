import React, {useContext} from 'react'
import ShapeSwitch from './ShapeSwitch'
import { Context } from "./SVGContext"

const SVGForm = ({uuidv4}) => {
  const {currentSVG, setCurrentSVG, shapeName, setAllSVGs, attributes, allSVGs, setShapeName, setAttributes} = useContext(Context)
  const shapes = ["Rectangle", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']

  const handleFormSubmission = (event) => {
    event.preventDefault()
  
    setAllSVGs([{currentSVG, shapeName, attributes}, ...allSVGs]) //add new svg to beginning of array
    //clear shapeName and attributes
    setShapeName("")
    setAttributes({})
  }

  const handleShapeChange = (event) => {
    event.preventDefault()
    
    setShapeName(event.target.value)
    setAttributes({})
    
    const shape = React.createElement(event.target.value, {...attributes, fill: "none", strokeWidth: 1, stroke: "red" })
    const svg = React.createElement('svg', {id: uuidv4(), key: uuidv4(), width: 378, height: 378, style:{border: "solid red 1px"}}, shape)
    setCurrentSVG(svg)
  }
  
  return (
    <form id={uuidv4()} className='svgForm' onSubmit={handleFormSubmission}>
        <select className='mb-3' name="" id="shapeSelection" onChange={handleShapeChange} value={shapeName}>
          <option id={uuidv4()} key={uuidv4()} value="" disabled>Select a shape</option>
          {shapes.map((shape) => {
            return (
            <option id={uuidv4()} key={uuidv4()} value={shape === "Rectangle" ? "rect" : shape.toLowerCase()}>
              {shape} 
            </option>)
          })}
        </select>

        <ShapeSwitch shape={shapeName}/>
        {currentSVG}
        <button type='submit' className='submit-svg-form my-3'>Create SVG</button>
        
      </form>
      
  )
}

export default SVGForm