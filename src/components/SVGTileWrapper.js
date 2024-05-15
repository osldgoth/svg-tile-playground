import React, { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import {v4 as uuidv4} from 'uuid'
import { Context } from "./SVGContext"

uuidv4()

const SVGTileWrapper = () => {
  const {shapeName, setShapeName, allSVGs, setAllSVGs, attributes, setAttributes} = useContext(Context)

  

  const handleDelete = (event) =>{
    //setAllSVGs
    const indexAsInt = parseInt(event.target.getAttribute('data-index'))
    setAllSVGs([...allSVGs.filter((_, currentIndex) => currentIndex !== indexAsInt )])
  }

  const handleEdit = (event) =>{
    const index = event.target.getAttribute('data-index')
    const attributes = allSVGs[index].attributes
    const shapeName = allSVGs[index].shapeName
    //set shapeSelect
    setShapeName(shapeName)
    //set inputs
    setAttributes(attributes)
    //then delete out of allsvgs?
  }

  return (
    <div className='container mt-3'>
      <h3>SVG playground.</h3> 
      <p>The following is not an exhaustive SVG builder, but rather a very basic and rudimentary one. 
        I have created it simply for myself to become more familiar with SVG's and along the way React by building it.
      </p>
      <SVGForm uuidv4={uuidv4}/>

      {allSVGs.map((currentSVG, index)=> { 
        return (
          <SVGTile index={index} uuidv4={uuidv4} currentSVG={currentSVG} handleDelete={handleDelete} handleEdit={handleEdit}/>
        )
      })}
    </div>
  )
}

export default SVGTileWrapper