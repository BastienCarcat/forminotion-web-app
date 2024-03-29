import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'

const URLField = ({ label, name, ...others }) => {
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
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-4 w-4 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 pl-9 focus:border-primary focus:ring-primary sm:text-sm"
              {...input}
            />
          </div>
        </div>
      )}
    </Field>
  )
}

URLField.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string.isRequired
}

export default URLField
