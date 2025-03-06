import { useContext } from 'react'
import SVGForm from './SVGForm'
import SVGTile from './SVGTile'
import { Context } from "./SVGContext"



const SVGTileWrapper = () => {
  const {
          allSVGs
        } = useContext(Context)

  return (
    <div className='container mt-3 px-0' style={{maxWidth: "95%"}}>
      <h3>SVG playground.</h3> 
      <p>
        This is not intended to be a comprehensive SVG builder, but rather a basic tool I created to familiarize myself with SVGs and React.
        For simplicity, I&apos;m currently using absolute coordinates.
        <br/>
        Select a shape, enter values, save, edit and delete as needed.
      </p>
      <SVGForm/>

      {allSVGs.map((svgData, index)=> { 
        return (
          <SVGTile key={index} index={index} svgData={svgData}/>
        )
      })}
    </div>
  )
}

export default SVGTileWrapper