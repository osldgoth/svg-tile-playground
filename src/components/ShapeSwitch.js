import React from "react";
import RectAttributes from './ShapeAttributes/RectAttributes'
import { ContextProvider } from "./SVGContext"

const RECT = 'rect'
const Shape = (props) => {
  const {shape} = props
  switch (shape) {
    case RECT:
      return <RectAttributes />
    default:
      return (
      <div>
        null
      </div>
      )
  }
}

export default Shape