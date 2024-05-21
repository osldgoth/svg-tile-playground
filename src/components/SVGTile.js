import React from 'react'
import {v4 as uuidv4} from 'uuid'



const SVGTile = ({index, shapeName, attributes, handleDelete, handleEdit}) => {
  let shape = null;
  if (typeof shapeName === 'string' && shapeName.trim() !== '') {
    shape = React.createElement(shapeName, {...attributes, fill: "none", strokeWidth: 1, stroke: "red" })
  }
  const currentsvg = React.createElement('svg', {id: uuidv4(), key: uuidv4(), width: 378, height: 378, style:{border: "solid green 1px"}}, shape)

  return (
    <div className="container" id={uuidv4()} key={uuidv4()}>
      <div className="card">
        <div className="card-header">
          <h2>{shapeName}</h2>
          {handleDelete ? <i className="bi bi-pencil-square" data-index={index} onClick={handleEdit}></i> : <></>}
          {handleEdit ? <i className="bi bi-x-octagon" data-index={index} onClick={handleDelete}></i> : <></>}
        </div>
        <div className="card-body">
          {currentsvg}
        </div>
      </div>
    </div>
  );
}

export default SVGTile