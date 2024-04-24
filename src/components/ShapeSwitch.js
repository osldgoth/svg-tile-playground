import React from "react";
import Rect from './ShapeAttributes/Rect'
import { Context } from "./SVGContext"

const RECT = 'rect'
const Shape = (props) => {
  const {shape} = props
  switch (shape) {
    case RECT:
      return <Rect />
    default:
      return (
      <div>
        null
      </div>
      )
  }
}

export default Shape