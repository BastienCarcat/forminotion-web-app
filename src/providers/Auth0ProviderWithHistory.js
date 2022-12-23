import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { config } from '../config'
import PropTypes from 'prop-types'

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate()
  const { auth0 } = config || {}
  const { domain, clientId, audience } = auth0

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  )
}

Auth0ProviderWithHistory.propTypes = {
  children: PropTypes.node.isRequired
}

export default Auth0ProviderWithHistory
