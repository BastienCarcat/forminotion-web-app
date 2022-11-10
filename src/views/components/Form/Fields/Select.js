import React, { Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
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
          <Listbox
            value={_.get(input, 'value')}
            onChange={(value) => {
              // input.onChange(
              //   _.find(options, (opt) => _.get(opt, 'id') === value)
              // )
              input.onChange(value)
            }}
          >
            <div className="mt-1 relative shadow-sm">
              <Listbox.Button className="border-[1px] cursor-pointer border-gray-300 relative w-full cursor-default py-2 pl-3 pr-10 text-left rounded-md sm:text-sm">
                {({ value }) => (
                  <>
                    <div className="truncate no-text">
                      {getOptionLabel(value)}
                    </div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </Listbox.Button>
              <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {_.map(options, (opt, key) => (
                  <Listbox.Option
                    key={key}
                    className={({ active }) =>
                      `cursor-pointer relative select-none pl-10 py-2 pr-4 ${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      }`
                    }
                    value={opt}
                  >
                    <>
                      <span
                        className={`block truncate ${
                          _.get(opt, 'id') === _.get(input, 'value.id')
                            ? 'font-medium'
                            : 'font-normal'
                        }`}
                      >
                        {getOptionLabel(opt)}
                      </span>
                      {_.get(opt, 'id') === _.get(input, 'value.id') ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
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
