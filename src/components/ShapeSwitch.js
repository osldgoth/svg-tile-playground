import React from "react";
import { Rect, Circle, Ellipse, Line, Polyline, Polygon, Path} from './Shapes'
import { Context } from "./SVGContext"

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
      return <Rect />
    case CIRCLE:
      return <Circle />
    case ELLIPSE:
      return <Ellipse />
    case LINE:
      return <Line />
    case POLYLINE:
      return <Polyline />
    case POLYGON:
      return <Polygon />
    case PATH:
      return <Path />
    default:
      return (null)
  }
}

export default Shape


            // {/* 
            //   M x y; 
            //   L x y; 
            //   T x y; 
            //   H x; 
            //   V y; 
            //   C x1 y1, x2 y2, x y;
            //   S x2 y2, x y; 
            //   Q x1 y1, x y; 
            //   A rx ry x-axis-rotation large-arc-flag sweep-flag x y
            //   Z; 
            // */}
            
            // {/* 
            //   XY *7
            //   X  *1
            //   Y  *1
            //   X1,X2,Y1,Y2 *2
            //   RX, RY, *1
            // */}