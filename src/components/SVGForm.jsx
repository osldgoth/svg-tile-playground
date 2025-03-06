import {useContext} from 'react'
import ShapeInputs from './ShapeInputs'
import { Context } from "./SVGContext"
import SVGTile from './SVGTile'

const SVGForm = () => {
  const {
          shapeName, setShapeName, 
          allSVGs, setAllSVGs,
          inputData, setInputData,
          processedData, setProcessedData,
          basic, setBasic
        } = useContext(Context)  
  const shapes = ["Rectangle", "Circle", 'Ellipse', 'Line', 'Polyline', 'Polygon', 'Path']

  const isAdvShape = (shape) => {
    return shape.includes('poly') ||
           shape === 'path'
  }

  const populateBasic = (inputData, shapeName) => {
    if(isAdvShape(shapeName)) return ''
    return inputData[shapeName] || ''
  }

  const handleFormSubmission = (event) => {
    event.preventDefault()
    const basic = populateBasic(inputData, shapeName.toLowerCase())
    setBasic(basic)
    setAllSVGs([{shapeName, processedData, basic}, ...allSVGs])
      //reset state to defaults
    setShapeName("")

    setInputData({})
    setProcessedData({data: [], "bg-primary-subtle": -1, SVGPath: '', SVGPoly: '' })
    setBasic('')
  }

  const handleShapeChange = (event) => {
    setShapeName(event.target.value)

    setInputData({})
    setProcessedData({data: [], "bg-primary-subtle": -1, SVGPath: '', SVGPoly: '' })
    setBasic('')
    //need a way to call hide arrows?
  }
  
  return (
    <form id={''} className='svgForm' onSubmit={handleFormSubmission}>
      <select className='mb-1' name="" id="shapeSelection" onChange={handleShapeChange} value={shapeName}>
        <option id={'Select a shape'} key={'-1'} value="" disabled>Select a shape</option>
        {shapes.map((shape, index) => {
          return (
          <option id={''} key={index} value={shape === "Rectangle" ? shape.slice(0,4) : shape}>
            {shape}
          </option>)
        })}
      </select>

      <ShapeInputs shape={shapeName.toUpperCase()} />
      <SVGTile index={-1} svgData={{shapeName, processedData, basic}}/>
      {shapeName &&
        <>
          {/* <button type='button'>Add this {shapeName} to current svg</button> // Post Launch feature */ } 
          <button type='submit' className='submit-svg-form my-3'>Save SVG</button>
        </>
      }
      
    </form>
      
  )
}

export default SVGForm