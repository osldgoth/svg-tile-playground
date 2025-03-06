import {getShapeData, handleDelete} from "./SVGTileUtils";
import { beforeEach, describe, expect, test, vi } from 'vitest'

const SvgData = {"shapeName": "","processedData": {"data": [],"bg-primary-subtle": -1,"SVGPath": "","SVGPoly": ""},"basic": ""}
const pathSvgData = {"shapeName": "Path",  "processedData": {"data": [{"M": {"x": 238,"y": 345}},{"C": {"x1": 318,"y1": 293,"x2": 216,"y2": 126,"x": 351,"y": 375}}],"bg-primary-subtle": -1,"SVGPath": "M 238 345 C 318 293 216 126 351 375","SVGPoly": ""},"basic": ""}
const polySvgData = {"shapeName": "Polyline","processedData": {"data": [{"x": 341,"y": 303},{"x": 161,"y": 255}],"bg-primary-subtle": -1,"SVGPath": "","SVGPoly": "341, 303 161, 255"},"basic": ""}
const basicSvgData = {"shapeName": "Rect","processedData": {"data": [],"bg-primary-subtle": -1,"SVGPath": "", "SVGPoly": ""},"basic": {"x": 217,"y": 329,"height": 173,"width": 245,"rx": 130,"ry": 297}}
const validInputData = {"rect": {"x": 222,"y": 182,"height": 342,"width": 55,"rx": 240,"ry": 307}}

describe('extracting shape data from inputData state or svgData from allSVGs state', () => {
  test('returns empty object when inputData is empty and svgData has no shape data', () => {
    expect(getShapeData('Path', {}, SvgData)).toEqual({})
    expect(getShapeData('Poly', {}, SvgData)).toEqual({})
    expect(getShapeData('Rect', {}, SvgData)).toEqual({})
  })

  test('valid data', () => {
    expect(getShapeData(pathSvgData.shapeName, {}, pathSvgData)).toEqual({d: "M 238 345 C 318 293 216 126 351 375"})
    expect(getShapeData(polySvgData.shapeName, {}, polySvgData)).toEqual({points: "341, 303 161, 255"})
    expect(getShapeData(basicSvgData.shapeName, {}, basicSvgData)).toEqual({"x": 217,"y": 329,"height": 173,"width": 245,"rx": 130,"ry": 297})
    expect(getShapeData(basicSvgData.shapeName, validInputData, {})).toEqual({"x": 222,"y": 182,"height": 342,"width": 55,"rx": 240,"ry": 307})
  })

  test('unexpected inputs and partial data', () => {
    expect(getShapeData('', {}, {})).toEqual({})
    expect(getShapeData('PATH', {}, pathSvgData)).toEqual({})
    expect(getShapeData('path', {}, pathSvgData)).toEqual({})
    expect(getShapeData('Path', null, null)).toEqual({})
    expect(getShapeData('Path', undefined, undefined)).toEqual({})
    expect(getShapeData(undefined, '', '')).toEqual({})
  })
})



describe('Remove an svg from state', () => {
  test.skip()
})