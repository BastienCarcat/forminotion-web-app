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
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                type="number"
                className="focus:ring-primary focus:border-primary w-full block appearance-none rounded-none rounded-l-md sm:text-sm border-gray-300"
                // className="focus:ring-primary focus:border-primary w-full sm:text-sm border-gray-300 rounded-md"
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
            <div className="-ml-px relative flex flex-col justify-center">
              <button
                type="button"
                className="space-x-2 px-4 -mb-px border border-gray-300 text-sm focus-within:z-10 font-medium rounded-tr-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                onClick={() => {
                  console.log('input.value', _.get(input, 'value') || 0)
                  input.onChange(
                    numeral(_.get(input, 'value') || 0)
                      .add(1)
                      .value()
                  )
                }}
              >
                <div className="-my-px">+</div>
              </button>
              <button
                type="button"
                className="space-x-2 px-4 -mt-px border border-gray-300 text-sm font-medium rounded-br-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                onClick={() =>
                  input.onChange(
                    numeral(_.get(input, 'value') || 0)
                      .subtract(1)
                      .value()
                  )
                }
              >
                <div className="-my-px">-</div>
              </button>
            </div>
          </div>
        </div>

        // <div className="mt-1 flex rounded-md shadow-sm">
        //   <div className="relative flex items-stretch flex-grow focus-within:z-10">
        //     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        //       <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //     </div>
        //       <input
        //       type="email"
        //       name="email"
        //       id="email"
        //       className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
        //       placeholder="John Doe"
        //       />
        //   </div>
        //     <button
        //     type="button"
        //     className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        //     >
        //     <SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //     <span>Sort</span>
        //     </button>
        // </div>
      )}
    </Field>
  )
}

NumberField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default NumberField
