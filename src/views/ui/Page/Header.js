import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Loader from '../Globals/Loader'

const PageHeader = ({ title, actions, loading }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 drop-shadow sm:px-6 lg:px-8">
      {loading ? (
        <div className="py-[5px]">
          <Loader size={24} />
        </div>
      ) : (
        <div className="flex-1">
          {title && (
            <h1 className="py-[5px] text-xl font-medium leading-6 text-gray-900 sm:truncate">
              {title}
            </h1>
          )}
        </div>
      )}
      {!_.isEmpty(actions) && <div className="flex">{_.map(actions)}</div>}
    </div>
  )
}

PageHeader.propTypes = {
  actions: PropTypes.array,
  title: PropTypes.string,
  loading: PropTypes.bool
}

export default PageHeader
