import React, { useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
import _ from 'lodash'
import { CheckIcon, ChevronDownIcon, XIcon } from '@heroicons/react/outline'

const SelectField = ({
  label,
  name,
  options,
  getOptionLabel,
  onChange,
  fieldProps,
  optionColor,
  ...others
}) => {
  const optionColors = useMemo(() => {
    return {
      bg_default: 'bg-notion-default-bg',
      bg_gray: 'bg-notion-gray-bg',
      bg_brown: 'bg-notion-brown-bg',
      bg_red: 'bg-notion-red-bg',
      bg_orange: 'bg-notion-orange-bg',
      bg_yellow: 'bg-notion-yellow-bg',
      bg_green: 'bg-notion-green-bg',
      bg_blue: 'bg-notion-blue-bg',
      bg_purple: 'bg-notion-purple-bg',
      bg_pink: 'bg-notion-pink-bg'
    }
  }, [])

  return (
    <Field name={name} {...fieldProps}>
      {({ input }) => (
        <div>
          <Listbox
            {...others}
            value={_.get(input, 'value')}
            onChange={(value) => {
              input.onChange(value)
              if (onChange && typeof onChange === 'function') {
                onChange(value)
              }
            }}
          >
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {label}
            </Listbox.Label>
            <div className="mt-1 relative shadow-sm">
              <Listbox.Button
                className={({ value }) =>
                  `bg-white border-[1px] disabled:opacity-50 cursor-pointer border-gray-300 relative w-full cursor-default py-2 pl-3 text-left rounded-md sm:text-sm ${
                    value ? 'pr-12' : 'pr-8'
                  }`
                }
              >
                {({ value }) => (
                  <>
                    <div className="truncate no-text">
                      {getOptionLabel(value)}
                    </div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      {_.get(value, 'id') && (
                        <button
                          onClick={(event) => {
                            input.onChange(null)
                            event.stopPropagation()
                            document.activeElement.blur()
                          }}
                          type="button"
                          className="pr-1"
                        >
                          <span className="sr-only">Remove value</span>
                          <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}

                      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    </span>
                  </>
                )}
              </Listbox.Button>
              <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {_.isEmpty(options) ? (
                  <Listbox.Option value="">
                    <div className="text-center py-1 text-gray-500">
                      No data
                    </div>
                  </Listbox.Option>
                ) : (
                  _.map(options, (opt, key) => (
                    <Listbox.Option
                      key={key}
                      className={({ active }) =>
                        `cursor-pointer select-none ${
                          optionColor ? 'py-1' : 'py-2'
                        } px-4 ${active ? 'bg-gray-100' : ''}`
                      }
                      value={opt}
                    >
                      {({ selected }) => (
                        <div className="flex justify-between gap-x-2">
                          <span
                            className={`block truncate ${
                              optionColor
                                ? `${_.get(
                                    optionColors,
                                    `bg_${_.get(opt, 'color')}`
                                  )} px-4 py-0.5 rounded-xl`
                                : ''
                            }`}
                          >
                            {getOptionLabel(opt)}
                          </span>
                          {selected && (
                            <span className="text-primary">
                              <CheckIcon className="w-5 h-5" />
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))
                )}
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
  getOptionLabel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  fieldProps: PropTypes.object,
  optionColor: PropTypes.bool
}

export default SelectField
