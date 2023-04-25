import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../ui/Globals/Loader'
import { useAuth0 } from '@auth0/auth0-react'

const LoginRedirect = () => {
  const { loginWithRedirect, handleRedirectCallback } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      try {
        await handleRedirectCallback()
        navigate('/')
      } catch (e) {
        console.error(e)
        await loginWithRedirect()
      }
    }

    init()
  }, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  )
}

LoginRedirect.propTypes = {}

export default LoginRedirect
