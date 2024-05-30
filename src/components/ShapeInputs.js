import React, { useRef, useEffect, useContext} from 'react';
import  LabelInput from './LabelInput'
import { Context } from './SVGContext';


const basicShapeConfig = {
  RECT: [
    { parameter: "x", label: "X Coordinate" },
    { parameter: "y", label: "Y Coordinate" },
    { parameter: "height", label: "Height" },
    { parameter: "width", label: "Width" },
    { parameter: "rx", label: "X Radius" },
    { parameter: "ry", label: "Y Radius" },
  ],
  CIRCLE: [
    { parameter: "r", label: "Radius" },
    { parameter: "cx", label: "Center X" },
    { parameter: "cy", label: "Center Y" },
  ],
  ELLIPSE: [
    { parameter: "rx", label: "Radius X" },
    { parameter: "ry", label: "Radius Y" },
    { parameter: "cx", label: "Center X" },
    { parameter: "cy", label: "Center Y" },
  ],
  LINE: [
    { parameter: "x1", label: "X1" },
    { parameter: "y1", label: "Y1" },
    { parameter: "x2", label: "X2" },
    { parameter: "y2", label: "Y2" },
  ],
};

const advancedShapeConfig = {
  POLYLINE: [
    { 
      attribute: "points=",
      label: "A list of points.",
      parameters: [
        { parameter: 'x', label: "X Coordinate" },
        { parameter: 'y', label: "Y Coordinate" }
      ]
    }
  ],
  POLYGON: [
    { 
      attribute: "points=",
      label: "A list of points.",
      parameters: [
        { parameter: 'x', label: "X Coordinate" },
        { parameter: 'y', label: "Y Coordinate" }
      ]
    }
  ],
  PATH: [
    { 
      attribute: "d=",
      label: "Path Data.",
      commands: [ 
        {
          command: 'M', 
          name: "Move",
          parameters: [
            { parameter: 'x', label: "X Coordinate" },
            { parameter: 'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'L', 
          name: "Line To",
          parameters: [
            { parameter:  'x', label: "X Coordinate" },
            { parameter:  'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'H', 
          name: "Horizontal line",
          parameters: [
            { parameter: 'x', label: "X Coordinate" }
          ]
        },
        {
          command: 'V', 
          name: "Vertical line",
          parameters: [
            { parameter: 'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'C', 
          name: "Cubic Béziers",
          parameters: [
            { parameter: 'x1', label: "X1" },
            { parameter: 'y1', label: "Y1" },
            { parameter: 'x2', label: "X2" },
            { parameter: 'y2', label: "Y2" },
            { parameter: 'x', label: "X Coordinate" },
            { parameter: 'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'S', 
          name: "Smooth Cubic Béziers",
          parameters: [
            { parameter: 'x2', label: "X2" },
            { parameter: 'y2', label: "Y2" },
            { parameter: 'x', label: "X Coordinate" },
            { parameter: 'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'Q', 
          name: "Quadratic Bézier",
          parameters: [
            { parameter: 'x1', label: "X1" },
            { parameter: 'y1', label: "Y1" },
            { parameter: 'x', label: "X Coordinate" },
            { parameter: 'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'T', 
          name: "Smooth Quadratic Bézier",
          parameters: [
            { parameter: 'x', label: "X Coordinate" },
            { parameter: 'y', label: "Y Coordinate" }
          ]
        },
        {
          command: 'A', 
          name: "Arc",
          parameters: [
            { parameter: 'rx', label: "Radius X" }, 
            { parameter: 'ry', label: "Radius Y" },
            { parameter: 'x-axis-rotation(0-360)', label: "X Axis Rotation" },
            { parameter: 'x', label: "X Coordinate" },
            { parameter: 'y', label: "Y Coordinate" }
          ], 
          flags: [
            { flag: 'large-arc-flag', label: "Large Arc Flag"},
            { flag: 'sweep-flag', label: "Sweep Flag"}
          ]
        },
        {
          command: 'Z', 
          name: "Close Path"
        }
      ]
    },
  ],
}

const ShapeInputs = ({ shape }) => {
  const {attributes, setAttributes, contextCommand, setContextCommand, coordinateDataContext, setcoordinateDataContext} = useContext(Context)
  const dynamicRefMap = useRef([]);
  const commandReference = useRef('')
  
  useEffect(() => {
    // Clear existing refs if shape changes
    dynamicRefMap.current = {};
    const config = advancedShapeConfig[shape] || basicShapeConfig[shape] || null
    if (config) {
      config.forEach((_, index) => {
        dynamicRefMap.current[index] = React.createRef();
      });
    }
  }, [shape]);

  const handleCommandChange = (event) => {
    setContextCommand(event.target.value)
    commandReference.current = event.target.value //to use value immediately
  }

  const coordinateData = () => {// try to optimise later
    //require input
    const inputElements = document.querySelectorAll('form input')
    let validity = [];
    inputElements && 
    (
      inputElements.forEach((element, index) => {
        validity[index] = element.checkValidity()
      })
    )
    const element = inputElements[validity.indexOf(false)]
    if(element){
      element.reportValidity()
    }
    if(!validity.includes(false)){
      setcoordinateDataContext((previousData) => [...previousData, ' ', contextCommand, Object.values(attributes).join(',')])
      setAttributes({})
    }
  }

  if (!basicShapeConfig[shape] && !advancedShapeConfig[shape]) {
    return null
  };

  return (
    <div>
      {basicShapeConfig[shape]?.map(({ parameter, label }, index) => 
        <LabelInput
          inputkey={ parameter }
          parameter={ parameter }
          label={ label }
          inputReference={ dynamicRefMap.current[index] }
        />
      )}
      {advancedShapeConfig[shape]?.map(({ attribute, label, commands, parameters }, index) => {
        return (
          <div key={attribute}>
            <label htmlFor="shapeData">{label}</label>
            <p id='shapeData'>{attribute}{coordinateDataContext}</p>
            {commands && 
              (
                <div>
                  <select className='mb-1' 
                          name='' 
                          id='commandSelection' 
                          onChange={handleCommandChange} 
                          value={contextCommand}>
                            
                    <option id={index} key={index} value='' disabled>Select a command</option>
                    {commands.map(({command, name}) => 
                      {
                        return <option id={command} key={command} value={command}>{name}</option>
                      }
                    )}
                  </select>
                  <div>
                    <fieldset name='parametersForCommand' id=''>
                      {commands.filter(({command})=> command === commandReference.current)[0]?.parameters?.map(({ parameter, label }, index) => (
                            <LabelInput
                            inputkey={ parameter }
                            parameter={ parameter }
                            label={ label }
                            inputReference={ null }
                            />
                        ))
                        }
                      <button type='button' id='commandsInput' onClick={coordinateData}>Add {commandReference.current}</button>
                    </fieldset>
                  </div>
                </div>
              )
            }
            {parameters && 
              (
                <div>
                  <fieldset name='parametersForCommand' id=''>
                    {parameters.map(({ parameter, label }, index) => 
                      (
                        <LabelInput
                        inputkey={ parameter }
                        parameter={ parameter }
                        label={ label }
                        inputReference={ null }
                        />
                      )
                    )}
                    <button type='button' id='parametersInput' onClick={coordinateData}>Add Coordinate</button>
                  </fieldset>
                </div>
              )
            }
          </div>
        )
      }
      )}
    </div>
  );
};

export default ShapeInputs;