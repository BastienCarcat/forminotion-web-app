import React from 'react'
import _ from 'lodash'
import { PropTypes } from 'prop-types'

const NotAvailableField = ({ label, type, ...others }) => {
  return (
    <div className="relative">
      <label className="blur-[1px] opacity-50 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          disabled
          type="text"
          className="disabled:blur-[1px] disabled:opacity-50 disabled:bg-gray-100 block w-full sm:text-sm border-gray-300 rounded-md"
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
            className="w-6 h-6 mr-1"
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
  label: PropTypes.string,
  type: PropTypes.string
}

export default NotAvailableField
