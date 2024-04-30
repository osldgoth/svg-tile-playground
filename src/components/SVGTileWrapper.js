import React, { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import {v4 as uuidv4} from 'uuid'
import { Context } from "./SVGContext"

uuidv4()

const SVGTileWrapper = () => {
  const {shapeName, setShapeName, allSVGs, setAllSVGs, attributes} = useContext(Context)
  
  const handleFormSubmission = (event) => {
    event.preventDefault()
    const shape = React.createElement(shapeName, {...attributes, fill: "none", strokeWidth: 1, stroke: "red" })
    const svg = React.createElement('svg', {id: uuidv4(), key: uuidv4(), width: 378, height: 378, style:{border: "solid red 1px"}}, shape)
  //clear shapeName and attributes?
    setAllSVGs([{svg, shapeName, attributes}, ...allSVGs]) //add new svg to beginning of array
  }

  const handleShapeChange = (event) => {
    event.preventDefault()
    setShapeName(event.target.value)
  }

  const allSVGsReversed = allSVGs.reverse()

  return (
    <div>
      <h1>The following is not an exhaustive SVG builder, but rather a very basic and rudimentary one.</h1>
      <SVGForm uuidv4={uuidv4} handleShapeChange={handleShapeChange} handleFormSubmission={handleFormSubmission}/>

      {allSVGsReversed.map(currentSVG => {
        return (
          <SVGTile id={uuidv4()} key={uuidv4()} currentSVG={currentSVG} />
        )
      })}
    </div>
  )
}

export default SVGTileWrapper