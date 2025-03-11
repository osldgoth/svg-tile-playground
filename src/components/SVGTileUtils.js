export const handleDelete = (event, setAllSVGs) =>{
  //setAllSVGs
  const indexAsInt = parseInt(event.target.getAttribute('data-index'))
  setAllSVGs( (previousAllSVGs) => {
   return [...previousAllSVGs.filter((_, currentIndex) => currentIndex !== indexAsInt )]
  })
}

export const handleEdit = (event, setAllSVGs, allSVGs, setShapeName, setInputData, setProcessedData, setBasic) =>{
  const indexAsInt = parseInt(event.target.getAttribute('data-index'))
  const shapeName = allSVGs[indexAsInt].shapeName
  const inputData = allSVGs[indexAsInt].basic ? {[shapeName.toLowerCase()]: allSVGs[indexAsInt].basic} : {}
  const processedData = allSVGs[indexAsInt].processedData
  setShapeName(shapeName)
  //set inputs
  setInputData(inputData)
  setProcessedData(processedData)
  setBasic('')
  //then delete svg out of allsvgs
  setAllSVGs( (previousAllSVGs) => {
    return [...previousAllSVGs.filter((_, i) => i !== indexAsInt)]
  })
}

export const getShapeData = ( shapeName, inputData, svgData ) => { //this can be 'fixed'
    if(shapeName === "Path") {
      const pathOrFallback = /* SVGPath ||  */svgData?.processedData.SVGPath
      return pathOrFallback ? {d: pathOrFallback} : {}
    }
    if(shapeName?.includes('Poly')) {
      const polyOrFallback = /* SVGPoly ||  */svgData?.processedData.SVGPoly
      return polyOrFallback ? {points: polyOrFallback} : {} 
    }
    return svgData?.basic || inputData[shapeName?.toLowerCase()] || {} 
  }