import React, { useContext } from 'react';
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
      attribute: "points",
      label: "A list of points.",
      parameters: [
        { parameter: 'x', label: "X Coordinate" },
        { parameter: 'y', label: "Y Coordinate" }
      ]
    }
  ],
  POLYGON: [
    { 
      attribute: "points",
      label: "A list of points.",
      parameters: [
        { parameter: 'x', label: "X Coordinate" },
        { parameter: 'y', label: "Y Coordinate" }
      ]
    }
  ],
  PATH: [
    { 
      attribute: "d",
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
            { parameter: 'rx', label: "Radius X"}, 
            { parameter: 'ry', label: "Radius Y"},
            { parameter: 'x-axis-rotation', label: "X Axis Rotation"},
            { parameter: 'x', label: "X Coordinate"},
            { parameter: 'y', label: "Y Coordinate"}
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
  const {attributes, setAttributes} = useContext(Context)

  const addCoordinateData = (command) => {// try to optimise later
    command = command.toLowerCase()

    //require input on shape path via non-submit buttons
    // intentional: excludes checkboxes (due to command value being upperCase)
    const inputElements = Array.from(document.querySelectorAll(`form input`)).filter(inputElement => 
      inputElement.id.split(/\s+/).includes(command)
    )

    let validity = [];
    
    //console.log("inputElements", inputElements)

    inputElements && (() => {
      inputElements.forEach((element, index) => {
        element.setAttribute('required', 'required')
        validity[index] = element.checkValidity()
      })

      const invalidElement = inputElements[validity.indexOf(false)]
      if(invalidElement){
        invalidElement.reportValidity()
      }
      inputElements.forEach(element => {
        element.removeAttribute('required')
      })
    })();

    if(!validity.includes(false)){ //all inputs are valid
      console.log("attributes from shapeinputs", attributes)
      const {d = '', points = '', poly = {}, ...rest} = attributes //rest is path commands
      const dPrefix = (d.trim().length === 0 && !d.trim().startsWith('M', 0)) ? 'M 0 0': ''
      const dPart = " " + command.toUpperCase() + " " + Object.values(rest[command] || {}).join(', ')
                     
      setAttributes(
        {
          "d": dPrefix + d + dPart,
          "points": points.trim() + " " + Object.values(poly).join(', '),
        }
      )
    }
  }

  const handleCheckedChange = (event, flag, command) => {
    //event.preventDefault()
    command = command.toLowerCase()
    console.log("target checked", event.target.checked)
    const {d = '', points = '', ...rest} = attributes //rest would be basic shape info such as poly, path, RECT, CIRCLE etc
    
    setAttributes(
      {
        "d": d,
        "points": points,
        [command]: {
          ...rest[command],
          [flag]: event.target.checked? 1 : 0
        }
      }
    )
  }

  if (!basicShapeConfig[shape] && !advancedShapeConfig[shape]) {
    return null
  };

  return (
    <div>
      {basicShapeConfig[shape]?.map(({ parameter, label }, index) => 
        <LabelInput
          key={ parameter + "-" + index }
          parameter={ parameter }
          label={ label }
          isrequired={'required'}
          command={shape}
        />
      )}
      {advancedShapeConfig[shape]?.map(({ attribute, label, commands: pathCommands, parameters: polyParameters }, index) => {
        return (
          <div key={attribute  + "-" + label  + "-" + index}>
            {pathCommands && //Path
              (
                <div>
                  {/* { attribute, label, commands: pathCommands, parameters: polyParameters }, index*/}
                  <div className="container" id={attribute + index} key={label + "-" + index}>
                    <label name={label} value={attribute}>
                      <p id='shapeData'>
                        {label}
                        <br />
                        {attribute}= '{attributes.d}'
                      </p>
                    </label>
                    {pathCommands.map(({command, name, parameters: pathParameters, flags}, index) =>
                      {
                        
                        return (
                          <div className="card" key={command + "-" + name + "-" + index}>
                            <div className="card-header">
                                {name}
                            </div>
                            <div className="card-body">
                            {pathParameters?.map(({ parameter, label}, index) => 
                              <LabelInput 
                                key={ parameter + "-" + index }
                                parameter={ parameter }
                                label={ label }
                                isrequired={null}
                                command={command}
                              />
                            
                            )
                            }
                            {flags?.map(({ flag, label }, index) =>{
                              return (
                                <label key={flag + "-" + index}>
                                  {label} 
                                  <input type='checkbox' 
                                         id={flag + ' ' + command} //intentional: leaving command here uppercase to bypass forced required within addCoordinateDatab
                                         onChange={event => handleCheckedChange(event, flag, command)}
                                         checked={attributes[command]?.[flag]}
                                  /> 
                                </label>
                              )}
                              )
                            }
                            </div>
                            <div className="card-footer">
                              <button type='button' id='commandsInput' onClick={() => addCoordinateData(command) }>Add {command}</button>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
            {polyParameters && //Polyline/Polygon
              (
                <div>
                  <label htmlFor="shapeData">{label}</label>
            <p id='shapeData'>{attribute}= '{attributes.points}'</p>
                  <fieldset name='parametersForCommand' id=''>
                    {polyParameters.map(({ parameter, label }, index) => 
                      (
                        <LabelInput //recreate a labelinput for these to rework set attributes
                        key={ parameter + "-" + index }
                        parameter={ parameter }
                        label={ label }
                        isrequired={null}
                        command={"poly"}
                        />
                      )
                    )}
                    <button type='button' id='parametersInput' onClick={() => addCoordinateData("poly")}>Add Coordinate {Object.values(attributes["poly"] || {}).join(", ")}</button>
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