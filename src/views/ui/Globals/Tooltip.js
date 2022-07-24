import React from 'react'
import PropTypes from 'prop-types'
import { InformationCircleIcon } from '@heroicons/react/outline'

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs text-white bg-gray-600 shadow-lg rounded-md">
          {text}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.any
}

export default Tooltip
