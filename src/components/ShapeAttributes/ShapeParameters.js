import React from 'react'

const X = () => {
  return (
    <div>
      <label htmlFor='x'>X</label>
      <input id='x' type='number' min={0} max={378} required/>
    </div>
  )
}

const Y = () => {
  return (
    <div>
      <label htmlFor='y'>Y</label>
      <input id='y' type='number' min={0} max={378} required/>
    </div>
  )
}

const RX = () => {
  return (
    <div>
      <label htmlFor='rx'>RX</label> {/*  one is required*/}
      <input id='rx' type='number' min={0} max={378} />
    </div>
  )
}

const RY = () => {
  return (
    <div>
      <label htmlFor='ry'>RY</label> {/*  one is required*/}
      <input id='ry' type='number' min={0} max={378} />
    </div>
  )
}

const CX = () => {
  return (
    <div>
      <label htmlFor='cx'>CX</label>
      <input id='cx' type='number' min={0} max={378} required/>
    </div>
  )
}

const CY = () => {
  return (
    <div>
      <label htmlFor='cy'>CY</label>
      <input id='cy' type='number' min={0} max={378} required/>
    </div>
  )
}

const POINTS = () => {
  return (
    <div>ShapeParameters</div>
  )
}

const R = () => {
  return (
    <div>
      <label htmlFor='r'>R</label>
      <input id='r' type='number' min={0} max={378} required/>
    </div>
  )
}

const HEIGHT = () => {
  return (
    <div>
      <label htmlFor='height'>HEIGHT</label>
      <input id='height' type='number' min={0} max={378} required/>
    </div>
  )
}

const WIDTH = () => {
  return (
    <div>
      <label htmlFor='width'>WIDTH</label>
      <input id='width' type='number' min={0} max={378} required/>
    </div>
  )
}

const D = () => {
  return (
    <div>ShapeParameters</div>
  )
}

export {X, Y, RX, RY, CX, CY, POINTS, R, HEIGHT, WIDTH, D}