import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'

const MailField = ({ label, name, ...others }) => {
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
          <div className="mt-1 relative shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </div>
            <input
              type="text"
              className="focus:ring-primary focus:border-primary pl-9 w-full sm:text-sm border-gray-300 rounded-md"
              {...input}
            />
          </div>
        </div>
      )}
    </Field>
  )
}

MailField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default MailField
