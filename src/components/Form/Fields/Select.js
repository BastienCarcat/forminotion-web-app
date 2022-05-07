import { Autocomplete as AutocompleteMat } from 'mui-rff'
import React from 'react'

const SelectField = ({ ...others }) => {
  return <AutocompleteMat {...others} />
}

SelectField.propTypes = {}

export default SelectField
