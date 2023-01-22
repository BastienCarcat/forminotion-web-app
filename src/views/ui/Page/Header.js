import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Loader from '../Globals/Loader'

const PageHeader = ({ title, actions, loading }) => {
  return (
    <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8 drop-shadow">
      {loading ? (
        <div className="py-[5px]">
          <Loader size={24} />
        </div>
      ) : (
        <div className="flex-1">
          {title && (
            <h1 className="text-xl font-medium leading-6 text-gray-900 sm:truncate py-[5px]">
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
