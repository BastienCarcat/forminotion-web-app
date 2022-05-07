import { TextField as TextFieldMat } from 'mui-rff'
import React from 'react'

const NumberField = ({ ...others }) => {
  return <TextFieldMat {...others} type="number" />
}

NumberField.propTypes = {}

export default NumberField
