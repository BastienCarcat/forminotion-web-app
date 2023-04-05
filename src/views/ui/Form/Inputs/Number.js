import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import numeral from 'numeral'

const NumberField = ({ label, name, ...others }) => {
  return (
    <Field name={name} className="appearance-none" {...others}>
      {({ input }) => (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="mt-1 flex shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="number"
                className="block w-full appearance-none rounded-none rounded-l-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
                {...input}
                onChange={(event) =>
                  input.onChange(
                    _.get(event, 'target.value')
                      ? _.toNumber(_.get(event, 'target.value'))
                      : ''
                  )
                }
                value={_.get(input, 'value')}
              />
            </div>
            <div className="relative -ml-px flex flex-col justify-center">
              <button
                type="button"
                className="-mb-px space-x-2 rounded-tr-md border border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 focus-within:z-10 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={() => {
                  input.onChange(
                    numeral(_.get(input, 'value') || 0)
                      .add(1)
                      .value()
                  )
                }}
              >
                <div className="sm:-my-px">+</div>
              </button>
              <button
                type="button"
                className="-mt-px space-x-2 rounded-br-md border border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={() =>
                  input.onChange(
                    numeral(_.get(input, 'value') || 0)
                      .subtract(1)
                      .value()
                  )
                }
              >
                <div className="sm:-my-px">-</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </Field>
  )
}

NumberField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string.isRequired
}

export default NumberField
