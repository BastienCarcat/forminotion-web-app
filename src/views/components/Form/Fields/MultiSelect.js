import { Autocomplete as AutocompleteMat } from 'mui-rff'
import React from 'react'

const MultiSelectField = ({ ...others }) => {
  return <AutocompleteMat {...others} multiple />
}

MultiSelectField.propTypes = {}

export default MultiSelectField
