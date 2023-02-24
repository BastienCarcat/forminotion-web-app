import React, { useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
import _ from 'lodash'
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'
import { CheckIcon } from '@heroicons/react/outline'

const StatusField = ({
  label,
  name,
  options,
  getOptionLabel,
  onChange,
  fieldProps,
  optionColor,
  groups,
  ...others
}) => {
  const optionColors = useMemo(() => {
    return {
      default: 'bg-notion-default',
      gray: 'bg-notion-gray',
      brown: 'bg-notion-brown',
      red: 'bg-notion-red',
      orange: 'bg-notion-orange',
      yellow: 'bg-notion-yellow',
      green: 'bg-notion-green',
      blue: 'bg-notion-blue',
      purple: 'bg-notion-purple',
      pink: 'bg-notion-pink',
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
            <div className="relative mt-1 shadow-sm">
              <Listbox.Button
                className={({ value }) =>
                  `relative w-full cursor-pointer cursor-default rounded-md border-[1px] border-gray-300 bg-white py-2 pl-3 text-left disabled:opacity-50 sm:text-sm ${
                    value ? 'pr-12' : 'pr-8'
                  }`
                }
              >
                {({ value }) => (
                  <>
                    <div className="no-text truncate">
                      {getOptionLabel(value)}
                    </div>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      {_.get(value, 'id') && (
                        <button
                          onClick={(event) => {
                            input.onChange({
                              name: null,
                              id: null,
                              color: null
                            })
                            event.stopPropagation()
                            document.activeElement.blur()
                          }}
                          type="button"
                          className="pr-1"
                        >
                          <span className="sr-only">Remove value</span>
                          <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}

                      <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    </span>
                  </>
                )}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {_.isEmpty(options) ? (
                  <Listbox.Option value="">
                    <div className="py-1 text-center text-gray-500">
                      No data
                    </div>
                  </Listbox.Option>
                ) : (
                  _.map(groups, (group) => (
                    <div key={_.get(group, 'id')} className="pb-2">
                      <div className="border-t border-gray-200 px-3 py-1 text-base">
                        {_.get(group, 'name')}
                      </div>
                      {_.chain(options)
                        .filter((opt) =>
                          _.includes(
                            _.get(group, 'option_ids'),
                            _.get(opt, 'id')
                          )
                        )
                        .map((opt) => (
                          <Listbox.Option
                            key={_.get(opt, 'id')}
                            className={({ active }) =>
                              `cursor-pointer select-none ${
                                optionColor ? 'py-1' : 'py-2'
                              } px-4 ${active ? 'bg-gray-100' : ''}`
                            }
                            value={opt}
                          >
                            {({ selected }) => (
                              <div className="flex justify-between gap-x-2">
                                <div
                                  className={`flex items-center justify-between gap-x-2 ${
                                    optionColor
                                      ? `${_.get(
                                          optionColors,
                                          `bg_${_.get(opt, 'color')}`
                                        )} rounded-xl px-4 py-0.5`
                                      : ''
                                  }`}
                                >
                                  {optionColor && (
                                    <span
                                      className={`inline-block h-2 w-2 rounded-full ${_.get(
                                        optionColors,
                                        _.get(opt, 'color')
                                      )}`}
                                    ></span>
                                  )}
                                  <span className="block truncate">
                                    {getOptionLabel(opt)}
                                  </span>
                                </div>

                                {selected && (
                                  <span className="text-primary">
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        ))
                        .value()}
                    </div>
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

StatusField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  fieldProps: PropTypes.object,
  optionColor: PropTypes.bool,
  groups: PropTypes.array.isRequired
}

export default StatusField