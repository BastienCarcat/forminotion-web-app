import React, { useMemo, useCallback } from 'react'
import { Listbox } from '@headlessui/react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
import _ from 'lodash'
import { CheckIcon, ChevronDownIcon, XIcon } from '@heroicons/react/outline'

const MultiSelectField = ({
  label,
  name,
  options,
  optionColor,
  getOptionLabel,
  ...others
}) => {
  const handleRemoveValue = useCallback((input, value, event) => {
    const newValues = _.filter(
      _.get(input, 'value'),
      (x) => _.get(x, 'id') !== _.get(value, 'id')
    )
    input.onChange(newValues)
    event.stopPropagation()
    document.activeElement.blur()
  }, [])

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
            <div className="relative mt-1 shadow-sm ">
              <Listbox.Button className="relative w-full cursor-pointer cursor-default rounded-md border-[1px] border-gray-300 py-2 pl-3 pr-10 text-left sm:text-sm">
                {({ value }) => (
                  <>
                    <div className="no-text overflow-hidden whitespace-nowrap">
                      {_.map(value, (x, i) => (
                        <span
                          key={i}
                          // className="inline-flex items-center py-0.5 pl-2 pr-0.5 mx-0.5 rounded-full text-xs font-medium bg-primary-150 text-primary-600"
                          className="mx-0.5 inline-flex items-center rounded-full bg-gray-200 py-0.5 pl-2 pr-0.5 text-xs font-medium"
                        >
                          {getOptionLabel(x)}
                          <button
                            onClick={(event) =>
                              handleRemoveValue(input, x, event)
                            }
                            type="button"
                            // className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-primary-400 hover:bg-primary-300 hover:text-primary-500 focus:outline-none focus:bg-primary-500 focus:text-white"
                            className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-gray-300 hover:text-gray-900 focus:bg-gray-500 focus:text-white focus:outline-none"
                          >
                            <span className="sr-only">Remove option</span>
                            <XIcon className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </span>
                  </>
                )}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {_.map(options, (opt, key) => {
                  return (
                    <Listbox.Option
                      key={key}
                      className={({ active }) =>
                        `relative cursor-pointer select-none ${
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
                                  )} rounded-xl px-4 py-0.5`
                                : ''
                            }`}
                          >
                            {getOptionLabel(opt)}
                          </span>
                          {selected && (
                            <span className="text-primary">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  )
                })}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      )}
    </Field>
  )
}

MultiSelectField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  optionColor: PropTypes.bool
}

export default MultiSelectField
