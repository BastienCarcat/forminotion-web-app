import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      <div className="absolute bottom-0 mb-6 flex hidden flex-col items-center group-hover:flex">
        <span className="relative z-10 rounded-md bg-gray-600 p-2 text-xs text-white shadow-lg">
          {text}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  )
}

Tooltip.propTypes = {
  text: PropTypes.any,
  children: PropTypes.node.isRequired
}

export default Tooltip
