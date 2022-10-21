import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

const SelectField = ({ label, name, options, getOptionLabel, ...others }) => {
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
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            {...input}
            value={_.get(input, 'value.id')}
            onChange={(event) => {
              input.onChange(
                _.find(
                  options,
                  (opt) => _.get(opt, 'id') === _.get(event, 'target.value')
                )
              )
            }}
          >
            {_.map(options, (option) => (
              <option key={_.get(option, 'id')} value={_.get(option, 'id')}>
                {getOptionLabel(option)}
              </option>
            ))}
          </select>
        </div>
      )}
    </Field>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired
}

export default SelectField
