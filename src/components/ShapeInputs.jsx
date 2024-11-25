import { useContext } from 'react';
import  LabelInput from './LabelInput'
import { Context } from './SVGContext';
import PropTypes from 'prop-types';


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

  const validateElements = (command) => {
    command = command.toLowerCase()
    const validity = []
    //require input on shape path via non-submit buttons
    // intentional: excludes checkboxes
    const inputElements = Array.from(document.querySelectorAll(`form input`)).filter(inputElement => 
      inputElement.id.split(/\s+/).includes(command)
    )
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

    return validity
  }

  const addPolyCoordinateData = (command) => {
    command = command.toLowerCase()
    console.log('poly command:', command)
    if(!validateElements(command).includes(false)){ //all inputs are valid - proceed
      const polyPart = `${attributes[command].x}, ${attributes[command].y} ` //preserve order x,y
        
      setAttributes(({ points, poly, ...rest }) => (
        {
          ...rest,
          "points": [...points, polyPart]
        })
      )
    }
  }

  const addPathCoordinateData = (command) => {// try to optimise later
    command = command.toLowerCase()
    let validity = validateElements(command);

    if(!validity.includes(false)){ //all inputs are valid - proceed
      let dPrefix = ''
      let dPart = ''
      let flagDefault = command === 'a'? '0' : ''

      const {x1 = '', y1 = '', x2 = '', y2 = '', rx = '', ry = '', 'x-axis-rotation': xAxisRotation = '',
            "large-arc-flag": largeArcFlag = flagDefault, "sweep-flag": sweepFlag = flagDefault, x = '', y = ''} = attributes[command] 

      if(command !== 'm' && attributes.d.length === 0){
        dPrefix = 'M 0 0'
      }

      dPart = ` ${command.toUpperCase()} ${x1} ${y1} ${x2} ${y2} ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`.replace(/\s+/g, ' ').trimEnd()
      setAttributes(({ [command]: extracted, d, ...rest }) => (
        {
          ...rest,
          "d": dPrefix ? [dPrefix, ...d, dPart] : [...d, dPart]
        })
      )
    }
  }

  const handleCheckedChange = (event, flag, command) => {
    //event.preventDefault()
    command = command.toLowerCase()
    const {d = [], points = [], ...rest} = attributes
    setAttributes(
      {
        "d": d,
        "points": points,
        ...rest,
        [command]: {
          ...rest[command],
          [flag]: event.target.checked? 1 : 0
        }
      }
    )
  }

  const loadSpanDataIntoInputs = () => {
    const currentSelectedSpanTextSplit = Array.from(document.getElementsByClassName("bg-primary-subtle"))[0].innerText.split(",")
    console.log(currentSelectedSpanTextSplit)
    const command = '' //I need to get this
    const parameter = 'x' //and this
    setAttributes(({d = [], points = [], ...rest}) => (
      {
        "d": d,
        "points": points,
        ...rest,
        [command]: {
          ...rest[command],
          [parameter]: currentSelectedSpanTextSplit[0]
        }
        
      })
    )
  }

  const handleAdvShapeDataEdit = () => { //split path vs poly?
    //first: check for highlight(selection)
    const currentSelectedSpans = Array.from(document.getElementsByClassName("bg-primary-subtle")) //should only be one unless something has gone wrong
    if(currentSelectedSpans.length > 0){
      //there are selected spans - they need to be unselected
      currentSelectedSpans.forEach((span) => {
        span.classList.toggle("bg-primary-subtle")
      })
      hideEditArrows()
      //clear inputs via setAttributes
    } else {
      //get spans
      const shapeDataSpans = Array.from(document.querySelectorAll("#shapeData > span"))
      const lastShapeDataSpan = shapeDataSpans[shapeDataSpans.length - 1] //no spans if d or points is empty
      lastShapeDataSpan && lastShapeDataSpan.classList.toggle("bg-primary-subtle")
      showEditArrows();
      //load span into inputs via setAttributes 
      loadSpanDataIntoInputs()
      //remove from data

      //add new data into spot or at the end ?
      }
  }

  const showEditArrows = ()=> {
    const arrows = document.querySelectorAll("#shapeData > i");
    arrows.forEach(iElement => iElement.classList.replace("d-none", "d-inline"));
  }
  
  const hideEditArrows = () => {
    const arrows = document.querySelectorAll("#shapeData > i");
    arrows.forEach(iElement => iElement.classList.replace("d-inline", "d-none"));
  }

  const handleAdvShapeDataDelete = () => {
    //need delete or remove single command
    hideEditArrows();
    setAttributes({
      // "d":[],
      // "points":[],
      // "poly": {}
     //temp fix?
     /*  a: {
        "large-arc-flag": 0,
        "sweep-flag": 0
      } */
    })
  }

  const handleEditCoordRight = () => {
    const currentSelectedSpanID = Number(document.getElementsByClassName("bg-primary-subtle")[0].id)
    const shapeDataSpans = Array.from(document.querySelectorAll("#shapeData > span"))
    if (currentSelectedSpanID < shapeDataSpans.length - 1){
      shapeDataSpans[currentSelectedSpanID].classList.toggle("bg-primary-subtle")
      shapeDataSpans[currentSelectedSpanID + 1].classList.toggle("bg-primary-subtle")
      //load span into inputs via setAttributes
      loadSpanDataIntoInputs()
    }
  }
  const handleEditCoordLeft = () => {
    const currentSelectedSpanID = Number(document.getElementsByClassName("bg-primary-subtle")[0].id)
    const shapeDataSpans = Array.from(document.querySelectorAll("#shapeData > span"))
    if (currentSelectedSpanID >= 1){
      shapeDataSpans[currentSelectedSpanID].classList.toggle("bg-primary-subtle")
      shapeDataSpans[currentSelectedSpanID - 1].classList.toggle("bg-primary-subtle")
      //load span into inputs via setAttributes
      loadSpanDataIntoInputs()
    }
  }

  if (!basicShapeConfig[shape] && !advancedShapeConfig[shape]) {
    return null
  };

  return (// DO: turn all below into components at the very least defined above.
    <div>
      {basicShapeConfig[shape]?.map(({ parameter, label }, index) => 
        <LabelInput
          key={ parameter + "-" + index }
          parameter={ parameter }
          label={ label }
          isrequired={ 'required' }
          command={ shape }
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
                    <div>
                      <label name={label} value={attribute}>
                        <p id='shapeData'>
                          {label}
                          <br />
                          {attribute}=
                          <i className="d-none bi bi-box-arrow-in-left" onClick={handleEditCoordLeft}></i>
                          &apos;{attributes.d?.map((data, index)=> 
                            (
                              <span key={index} id={index} data-shape-name={shape.toLowerCase()} data-command={data[1]}>{data}</span>
                            ))
                          }&apos;
                          <i className="d-none bi bi-box-arrow-in-right" onClick={handleEditCoordRight}></i>
                        </p>
                      </label>
                      {
                        attributes.d?.length > 0
                        ? 
                        <>
                          {/* <div className='tooltip'> {/*https://www.w3schools.com/css/css_tooltip.asp */}
                          {/*  <span className='tooltipText'>Edit</span> */}
                          {/* todo: on mobile/small screens switch to buttons&text instead of the below icons */}
                            <i className="bi bi-pencil-square" data-index={index} onClick={handleAdvShapeDataEdit}></i>
                          {/* </div> */}

                          {/* <div className='tooltip'>*/}
                          {/*  <span className='tooltipText'>Edit</span> */}
                            <i className="bi bi-x-octagon" data-index={index} onClick={handleAdvShapeDataDelete}></i>
                          {/* </div> */}
                        </>
                        : 
                        <></>
                      }
                    </div>
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
                                         id={flag + ' ' + command} //intentional: leaving command here uppercase to bypass forced require within addPathCoordinateData
                                         onChange={event => handleCheckedChange(event, flag, command)} // needs to still be 0 even if not checked -> use value?
                                         checked={attributes[command]?.[flag]}
                                  /> 
                                </label>
                              )}
                              )
                            }
                            </div>
                            <div className="card-footer">
                              <button type='button' id='commandsInput' onClick={() => addPathCoordinateData(command) }>Add {command}</button>
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
                  <div>
                    <label name='' value='' >
                      <p id='shapeData'>
                        {label}
                        <br />
                        {attribute}= 
                        <i className="d-none bi bi-box-arrow-in-left" onClick={handleEditCoordLeft}></i>
                        &apos;{attributes.points?.map((data, index)=> 
                          (
                            <span key={index} id={index} data-shape-name={shape.toLowerCase()} data-paramaters={polyParameters.map(({parameter}) => parameter)}>{data}</span>
                          ))
                        }&apos;
                        <i className="d-none bi bi-box-arrow-in-right" onClick={handleEditCoordRight}></i>
                      </p>
                    </label>
                    {
                      attributes.points?.length > 0 
                      ?
                      <>
                        <i className="bi bi-pencil-square" data-index={index} onClick={handleAdvShapeDataEdit}></i>
                        <i className="bi bi-x-octagon" data-index={index} onClick={handleAdvShapeDataDelete}></i>
                      </>
                      :
                      <></>
                    }
                  </div>
                  <fieldset name='parametersForCommand' id=''>
                    {polyParameters.map(({ parameter, label }, index) => 
                      (
                        <LabelInput //recreate a labelinput for these to rework set attributes
                        key={ parameter + "-" + index }
                        parameter={ parameter }
                        label={ label }
                        isrequired={null}
                        command={shape}
                        />
                      )
                    )}
                    <button type='button' id='parametersInput' onClick={() => addPolyCoordinateData(shape)}>Add Coordinate {Object.values(attributes["poly"] || {}).join(", ")}</button>
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

ShapeInputs.propTypes = {
  shape: PropTypes.string,
};

export default ShapeInputs;

