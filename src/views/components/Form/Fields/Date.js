import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'

const DateField = ({ label, name, ...others }) => {
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
              type="date"
              className="focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md"
              {...input}
              placeholder=" /    /    "
              // onChange={(event) =>
              //   input.onChange(
              //     _.get(event, 'target.value')
              //       ? _.toNumber(_.get(event, 'target.value'))
              //       : ''
              //   )
              // }
              // value={_.get(input, 'value')}
            />
          </div>
        </div>
      )}
    </Field>
  )
}

DateField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default DateField
