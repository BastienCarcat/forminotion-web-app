import React from 'react'
import FormEditionBlockForm from './Blocks/Form/Form'
import PropTypes from 'prop-types'
export const DraggableTypes = Object.freeze({ FIELD: 'FIELD' })
const FormEditionLayout = ({ form }) => {
  return (
    <>
      <FormEditionBlockForm form={form} />
    </>
  )
}

FormEditionLayout.propTypes = {
  form: PropTypes.object
}

export default FormEditionLayout
