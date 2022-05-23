import { Switches as SwitchesMat } from 'mui-rff'
import React from 'react'
import { PropTypes } from 'prop-types'

const SwitchField = ({ label, ...others }) => {
  return <SwitchesMat data={{ label }} {...others} />
}

SwitchField.propTypes = {
  label: PropTypes.string
}

export default SwitchField
