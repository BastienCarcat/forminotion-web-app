import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'

const TextField = ({ label, name, ...others }) => {
  return (
    <Field name={name} {...others}>
      {({ input }) => (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              {...input}
            />
          </div>
        </div>
      )}
    </Field>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default TextField
