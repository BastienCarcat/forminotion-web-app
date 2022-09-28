import React from 'react'
import { PropTypes } from 'prop-types'

const FormCreationStepPreview = () => {
  return (
    <div>
      <h3>Preview</h3>
      <button type="submit">SUBMIT</button>
    </div>
  )
}
FormCreationStepPreview.propTypes = {
  setCurrentStep: PropTypes.func
}

export default FormCreationStepPreview
