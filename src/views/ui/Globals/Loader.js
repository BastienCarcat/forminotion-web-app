import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import _ from 'lodash'

const Loader = ({ classes }) => {
  return (
    <div
      className={clsx(
        'flex space-x-2 p-5 rounded-full justify-center items-center',
        _.get(classes, 'root')
      )}
    >
      <div
        style={{ animationDelay: '0.1s' }}
        className={clsx(
          'bg-primary w-4 h-4 rounded-full animate-bounce',
          _.get(classes, 'dot')
        )}
      />
      <div
        style={{ animationDelay: '0.3s' }}
        className={clsx(
          'bg-primary w-4 h-4 rounded-full animate-bounce',
          _.get(classes, 'dot')
        )}
      />
      <div
        style={{ animationDelay: '0.5s' }}
        className={clsx(
          'bg-primary w-4 h-4 rounded-full animate-bounce',
          _.get(classes, 'dot')
        )}
      />
    </div>
  )
}

Loader.propTypes = {
  classes: PropTypes.object
}

export default Loader
