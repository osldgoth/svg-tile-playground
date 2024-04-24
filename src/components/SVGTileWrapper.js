import React, { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import {v4 as uuidv4} from 'uuid'
import { Context } from "./SVGContext"

uuidv4()

const SVGTileWrapper = () => {
  const {SVG, setSVG, allSVGs, setAllSVGs} = useContext(Context)
  const handleFormSubmission = () => {
    //other attributes
    setAllSVGs([...allSVGs, {SVG}])
    console.log(allSVGs)
  }

  const handleShapeChange = (event) => {
    event.preventDefault()
    setSVG(prevSVG => ({
      ...prevSVG,
      shapeName: event.target.value
    }))
    console.log(SVG)
  }

  return (
    <div>
      <SVGForm uuidv4={uuidv4} handleShapeChange={handleShapeChange} handleFormSubmission={handleFormSubmission}/>
      {allSVGs.map((currentSVG, id) => {
        return (
          <SVGTile id={id} currentSVG={currentSVG} />
        )
      })}
    </div>
  )
}
// document.createElementNS("http://www.w3.org/2000/svg", "{first-select-value}")
export default SVGTileWrapper