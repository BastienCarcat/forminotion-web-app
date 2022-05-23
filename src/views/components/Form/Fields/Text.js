import { TextField as TextFieldMat } from 'mui-rff'
import React from 'react'

const TextField = ({ ...others }) => {
  return <TextFieldMat {...others} />
}

TextField.propTypes = {}

export default TextField
