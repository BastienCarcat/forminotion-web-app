import React, { Fragment, useCallback } from 'react'
import { Listbox } from '@headlessui/react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
import _ from 'lodash'

const MultiSelectField = ({
  label,
  name,
  options,
  getOptionLabel,
  ...others
}) => {
  const handleRemoveValue = useCallback((input, value) => {
    const newValues = _.filter(
      _.get(input, 'value'),
      (x) => _.get(x, 'id') !== _.get(value, 'id')
    )
    input.onChange(newValues)
  }, [])

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
            multiple
            value={_.get(input, 'value')}
            onChange={(value) => {
              input.onChange(value)
            }}
          >
            <div className="mt-1 relative shadow-sm ">
              <Listbox.Button className="border-[1px] cursor-pointer border-gray-300 relative w-full cursor-default py-2 pl-3 pr-10 text-left rounded-md sm:text-sm">
                {({ value }) => (
                  <>
                    <div className="overflow-hidden whitespace-nowrap no-text">
                      {_.map(value, (x) => (
                        <span className="inline-flex items-center py-0.5 pl-2 pr-0.5 mx-0.5 rounded-full text-xs font-medium bg-primary-150 text-primary-600">
                          {getOptionLabel(x)}
                          <button
                            onClick={() => handleRemoveValue(input, x)}
                            type="button"
                            className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:bg-primary-300 hover:text-primary-500 focus:outline-none focus:bg-primary-500 focus:text-white"
                          >
                            <span className="sr-only">Remove small option</span>
                            <svg
                              className="h-2 w-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 8 8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6m0-6L1 7"
                              />
                            </svg>
                          </button>
                        </span>
                      ))}
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
                      `cursor-pointer relative select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      }`
                    }
                    value={opt}
                  >
                    <>
                      <span
                        className={`block truncate ${
                          _.includes(
                            _.map(_.get(input, 'value'), 'id'),
                            _.get(opt, 'id')
                          )
                            ? 'font-medium'
                            : 'font-normal'
                        }`}
                      >
                        {getOptionLabel(opt)}
                      </span>
                      {_.includes(
                        _.map(_.get(input, 'value'), 'id'),
                        _.get(opt, 'id')
                      ) ? (
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

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired
}

export default MultiSelectField
