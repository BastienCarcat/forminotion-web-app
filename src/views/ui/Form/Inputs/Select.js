import React, { useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import { PropTypes } from 'prop-types'
import { Field } from 'react-final-form'
import _ from 'lodash'
import { CheckIcon, ChevronDownIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Loader from '../../Globals/Loader'

const SelectField = ({
  label,
  name,
  options,
  getOptionLabel,
  onChange,
  fieldProps,
  optionColor,
  action,
  loading,
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
          <div
            className={clsx(
              'block text-sm font-medium text-gray-700',
              action ? 'flex items-center justify-between' : ''
            )}
          >
            <Listbox.Label>{label}</Listbox.Label>
            {action}
          </div>

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
                    {loading && <Loader size={18} className="pr-2" />}

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
                  <div className="py-1 text-center text-gray-500">No data</div>
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
                ))
              )}
            </Listbox.Options>
          </div>
        </Listbox>
      )}
    </Field>
  )
}

SelectField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  fieldProps: PropTypes.object,
  optionColor: PropTypes.bool,
  action: PropTypes.any,
  loading: PropTypes.bool
}

export default SelectField
