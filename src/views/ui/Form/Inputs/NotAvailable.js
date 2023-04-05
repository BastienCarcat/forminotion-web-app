import React from 'react'
import _ from 'lodash'
import { PropTypes } from 'prop-types'

const NotAvailableField = ({ label, type, ...others }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 opacity-50 blur-[1px]">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...others}
          disabled
          type="text"
          className="block w-full rounded-md border-gray-300 disabled:bg-gray-100 disabled:opacity-50 disabled:blur-[1px] sm:text-sm"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 w-full -translate-y-1/2 -translate-x-1/2">
        <div className="flex justify-center text-orange-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mr-1 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {_.startCase(type)} field is not available yet
        </div>
      </div>
    </div>
  )
}

NotAvailableField.propTypes = {
  label: PropTypes.any,
  type: PropTypes.string
}

export default NotAvailableField
