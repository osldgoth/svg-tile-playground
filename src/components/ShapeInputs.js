import React, { useRef, useEffect } from 'react';
import  LabelInput from './LabelInput'


const shapeConfig = {
  RECT: [
    { parameter: "x", label: "X Coordinate", type: "number" },
    { parameter: "y", label: "Y Coordinate", type: "number" },
    { parameter: "height", label: "Height", type: "number" },
    { parameter: "width", label: "Width", type: "number" },
    { parameter: "rx", label: "X Radius", type: "number" },
    { parameter: "ry", label: "Y Radius", type: "number" },
  ],
  CIRCLE: [
    { parameter: "r", label: "Radius", type: "number" },
    { parameter: "cx", label: "Center X", type: "number" },
    { parameter: "cy", label: "Center Y", type: "number" },
  ],
  ELLIPSE: [
    { parameter: "rx", label: "Radius X", type: "number" },
    { parameter: "ry", label: "Radius Y", type: "number" },
    { parameter: "cx", label: "Center X", type: "number" },
    { parameter: "cy", label: "Center Y", type: "number" },
  ],
  LINE: [
    { parameter: "x1", label: "X1", type: "number" },
    { parameter: "y1", label: "Y1", type: "number" },
    { parameter: "x2", label: "X2", type: "number" },
    { parameter: "y2", label: "Y2", type: "number" },
  ],
  POLYLINE: [
    { parameter: "points", label: "Points", type: "text" },
  ],
  POLYGON: [
    { parameter: "points", label: "Points", type: "text" },
  ],
  PATH: [
    { parameter: "d", label: "Path Data", type: "text" },
  ],
};

const ShapeInputs = ({ shape }) => {
  const dynamicRefMap = useRef([]);
  useEffect(() => {
    // Clear existing refs if shape changes
    dynamicRefMap.current = [];
    if (shapeConfig[shape]) {
      shapeConfig[shape].forEach((_, index) => {
        dynamicRefMap.current[index] = React.createRef();
      });
    }
  }, [shape]);

  if (!shapeConfig[shape]) {
    return null
  };

  return (
    <div>
      {shape === 'PATH' && (
        <h6>
          M x y 
          L x y
          T x y
          H x
          V y 
          C x1 y1, x2 y2, x y
          S x2 y2, x y
          Q x1 y1, x y
          A rx ry x-axis-rotation large-arc-flag sweep-flag x y
          Z
        </h6>
      )}
      {shapeConfig[shape].map(({ parameter, label, type }, index) => 
        <LabelInput
          inputkey={parameter}
          parameter={parameter}
          label={label}
          type={type}
          inputReference={dynamicRefMap.current[index]}
        />
      )}
    </div>
  );
};

export default ShapeInputs;