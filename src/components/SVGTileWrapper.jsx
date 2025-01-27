import { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import { Context } from "./SVGContext"



const SVGTileWrapper = () => {
  const {
          setShapeName, 
          allSVGs, setAllSVGs, 
          setInputData, setProcessedData,
          setPath,
          setPoly,
          setBasic
        } = useContext(Context)
  

  const handleDelete = (event) =>{
    //setAllSVGs
    const indexAsInt = parseInt(event.target.getAttribute('data-index'))
    setAllSVGs([...allSVGs.filter((_, currentIndex) => currentIndex !== indexAsInt )])
  }

  const handleEdit = (event) =>{
    const indexAsInt = parseInt(event.target.getAttribute('data-index'))
    const shapeName = allSVGs[indexAsInt].shapeName
    const inputData = allSVGs[indexAsInt].basic ? {[shapeName]: allSVGs[indexAsInt].basic} : {}
    const processedData = allSVGs[indexAsInt].processedData
    const path = allSVGs[indexAsInt].path 
    const poly = allSVGs[indexAsInt].poly
    setShapeName(shapeName)
    //set inputs
    setInputData(inputData)
    setProcessedData(processedData)
    setPath(path)
    setPoly(poly)
    setBasic('')
    //then delete svg out of allsvgs
    setAllSVGs([...allSVGs.filter((_, i) => i !== indexAsInt)])
  }

  return (
    <div className='container mt-3'>
      <h3>SVG playground.</h3> 
      <p>The following is not an exhaustive SVG builder, but rather a very basic and rudimentary one. 
        I have created it simply for myself to become more familiar with SVG&apos;s and, along the way, React by building it.
        For now I am sticking to absolute coordinates for simplicity.
      </p>
      <SVGForm/>

      {allSVGs.map((svgData, index)=> { 
        return (
          <SVGTile key={index} index={index} svgData={svgData} handleDelete={handleDelete} handleEdit={handleEdit}/>
        )
      })}
    </div>
  )
}

export default SVGTileWrapper