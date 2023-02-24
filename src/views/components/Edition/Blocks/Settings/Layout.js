import React from 'react'
import PropTypes from 'prop-types'
import FormEditionSettingsGeneral from './General/General'

const FormEditionSettingsLayout = () => {
  return (
    <>
      <FormEditionSettingsGeneral />
    </>
  )
}

FormEditionSettingsLayout.propTypes = {
  form: PropTypes.object
}

export default FormEditionSettingsLayout
