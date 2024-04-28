import React from "react";
import  LabelInput from './LabelInput'

const RECT = 'rect'
const CIRCLE = 'circle'
const ELLIPSE = 'ellipse'
const LINE = 'line'
const POLYLINE = 'polyline'
const POLYGON = 'polygon'
const PATH = 'path'

const Shape = (props) => {
  const {shape} = props
  switch (shape) {
    case RECT:
      // return <Rect />
      return <div>
              <LabelInput parameter="x" label="" type="number" />
              <LabelInput parameter="y" label="" type="number" />
              <LabelInput parameter="height" label="" type="number" />
              <LabelInput parameter="width" label="" type="number" />
              <LabelInput parameter="rx" label="" type="number" />
              <LabelInput parameter="ry" label="" type="number" />
            </div>
    case CIRCLE:
      return <div>
              <LabelInput parameter="r" label="" type="number" />
              <LabelInput parameter="cx" label="" type="number" />   
              <LabelInput parameter="cy" label="" type="number" />
            </div>
    case ELLIPSE:
      return  <div>
                <LabelInput parameter="rx" label="" type="number" />
                <LabelInput parameter="ry" label="" type="number" />
                <LabelInput parameter="cx" label="" type="number" />
                <LabelInput parameter="cy" label="" type="number" />
              </div>
    case LINE:
      return <div>
              <LabelInput parameter="x1" label="" type="number" />
              <LabelInput parameter="y1" label="" type="number" />
              <LabelInput parameter="x2" label="" type="number" />
              <LabelInput parameter="y2" label="" type="number" />
            </div>
    case POLYLINE:
      return <div>
              <LabelInput parameter="points" label="" type="text" />
            </div>
    case POLYGON:
      return <div>
               <LabelInput parameter="points" label="" type="text" />
            </div>
    case PATH:
      return <div>
              <h4>M x y
               L x y
               T x y
               H x
               V y
               C x1 y1, x2 y2, x y
               S x2 y2, x y
               Q x1 y1, x y 
               A rx ry x-axis-rotation large-arc-flag sweep-flag x y
               Z</h4>
              <LabelInput parameter="d" label="" type="text" />
              {/* commands */}
            </div>
    default:
      return (null)
  }
}

export default Shape