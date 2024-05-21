import React, { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import {v4 as uuidv4} from 'uuid'
import { Context } from "./SVGContext"

uuidv4()

const SVGTileWrapper = () => {
  const {setAllSVGs, allSVGs, setShapeName, setAttributes} = useContext(Context) //currentSVG, setCurrentSVG, shapeName, attributes,
  

  const handleDelete = (event) =>{
    //setAllSVGs
    const indexAsInt = parseInt(event.target.getAttribute('data-index'))
    setAllSVGs([...allSVGs.filter((_, currentIndex) => currentIndex !== indexAsInt )])
  }

  const handleEdit = (event) =>{
    const indexAsInt = parseInt(event.target.getAttribute('data-index'))
    const attributes = allSVGs[indexAsInt].attributes
    const shapeName = allSVGs[indexAsInt].shapeName
    //set shapeSelect
    setShapeName(shapeName)
    //set inputs
    setAttributes(attributes)
    //then delete svg out of allsvgs to replace with updated svg
    setAllSVGs([...allSVGs.filter((_, i) => i !== indexAsInt)])
  }

  return (
    <div className='container mt-3'>
      <h3>SVG playground.</h3> 
      <p>The following is not an exhaustive SVG builder, but rather a very basic and rudimentary one. 
        I have created it simply for myself to become more familiar with SVG's and along the way React by building it.
      </p>
      <SVGForm/>

      {allSVGs.map(({shapeName, attributes}, index)=> { 
        return (
          <SVGTile index={index} key={uuidv4()} shapeName={shapeName} attributes={attributes} handleDelete={handleDelete} handleEdit={handleEdit}/>
        )
      })}
    </div>
  )
}

export default SVGTileWrapper