import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

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
          <div className="relative mt-1 shadow-sm">
            <input
              type="text"
              className="w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
              {...input}
              onChange={(event) =>
                input.onChange([
                  { text: { content: _.get(event, 'target.value') } }
                ])
              }
              value={_.get(input, 'value.[0].text.content')}
            />
          </div>
        </div>
      )}
    </Field>
  )
}

TextField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string.isRequired
}

export default TextField
