import React from "react";
import RectAttributes from './ShapeAttributes/RectAttributes'
import { ContextProvider } from "./SVGContext"

const RECT = 'rect'
const Shape = (props) => {
  const {shape} = props
  switch (shape) {
    case RECT:
      return     (<div>
      <label>X</label>
      <input type='number' />
      <label>Y</label>
      <input type='number' />
      <label>Width</label>
      <input type='number' />
      <label>Height</label>
      <input type='number' />
      <label>rx</label>
      <input type='number' />
      <label>ry</label>
      <input type='number' />
    </div>
      )
      // <RectAttributes />
    default:
      return (<div>
        <label>X</label>
        <input type='number' />
        <label>Y</label>
        <input type='number' />
        <label>Width</label>
        <input type='number' />
        <label>Height</label>
        <input type='number' />
        <label>rx</label>
        <input type='number' />
        <label>ry</label>
        <input type='number' />
      </div>
        )
  }
}

export default Shape