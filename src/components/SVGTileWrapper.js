import React, { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import {v4 as uuidv4} from 'uuid'
import { Context } from "./SVGContext"

uuidv4()

const SVGTileWrapper = () => {
  const {allSVGs} = useContext(Context)
  const handleFormSubmission = () => {

  }

  const handleShapeChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
  }

let pathD="M 10 10 L 30 30 T 60 10 90 30 L 100 100 T 70 70 30 70 10 50 Z"
pathD += `M 105 105 h ${Math.floor(Math.random()*100)} v ${Math.floor(Math.random()*100)} Z`
console.log(pathD)
  return (
    <div>
      
      <SVGForm handleShapeChange={handleShapeChange} handleFormSubmission={handleFormSubmission}/>
      {allSVGs.map((currentSVG, id) => {
        return (
          <SVGTile id={id} currentSVG={currentSVG} />
        )
      })}    
      
      
      <svg width="378" height="378" style={{border: "solid red 1px"}}>
  <path d={pathD} fill="none" stroke='yellow' strokeDasharray='5'/>
</svg>

    </div>
  )
}
// document.createElementNS("http://www.w3.org/2000/svg", "{first-select-value}")
export default SVGTileWrapper