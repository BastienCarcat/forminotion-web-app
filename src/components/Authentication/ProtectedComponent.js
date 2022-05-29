import React from 'react'
import PropTypes from 'prop-types'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const ProtectedComponent = ({ component, ...others }) => {
  const Cp = withAuthenticationRequired(component)
  return <Cp {...others} />
}

ProtectedComponent.propTypes = {
  component: PropTypes.any.isRequired
}

export default ProtectedComponent
