import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Loader from '../ui/Globals/Loader'

const LogoutScreen = () => {
  const navigate = useNavigate()
  const { logout } = useAuth0()

  useEffect(() => {
    const func = async () => {
      try {
        logout({
          returnTo: window.location.origin
        })
      } catch (e) {
        console.error(e)
        navigate('/logout-fail', { replace: true })
      }
    }
    func()
  }, [navigate, logout])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  )
}

export default LogoutScreen
