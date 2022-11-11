import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const PageHeader = ({ title, actions }) => {
  return (
    <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
      <div className="flex-1">
        {title && (
          <h1 className="text-xl font-medium leading-6 text-gray-900 sm:truncate">
            {title}
          </h1>
        )}
      </div>
      {!_.isEmpty(actions) && <div className="flex">{_.map(actions)}</div>}
    </div>
  )
}

PageHeader.propTypes = {
  actions: PropTypes.array,
  title: PropTypes.string
}

export default PageHeader
