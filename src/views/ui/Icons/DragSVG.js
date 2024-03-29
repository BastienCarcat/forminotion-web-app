import React from 'react'
import PropTypes from 'prop-types'

const DragSVG = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.5 10a2 2 0 1 0 2 2a2 2 0 0 0-2-2Zm0 7a2 2 0 1 0 2 2a2 2 0 0 0-2-2Zm7-10a2 2 0 1 0-2-2a2 2 0 0 0 2 2Zm-7-4a2 2 0 1 0 2 2a2 2 0 0 0-2-2Zm7 14a2 2 0 1 0 2 2a2 2 0 0 0-2-2Zm0-7a2 2 0 1 0 2 2a2 2 0 0 0-2-2Z"
      ></path>
    </svg>
  )
}

DragSVG.propTypes = {
  props: PropTypes.object
}

export default DragSVG
