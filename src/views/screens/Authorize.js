import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../ui/Globals/Loader'
import useLocalStorage from '../../hooks/useLocalStorage'

const AuthorizeScreen = () => {
  const { idAuthorization } = useParams()
  const [authorization, setAuthorization] = useLocalStorage('authorization')

  useEffect(() => {
    if (!authorization && idAuthorization) {
      setAuthorization(idAuthorization)
      console.log('idAuthorization', idAuthorization)
    }
  }, [idAuthorization])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  )
}

AuthorizeScreen.propTypes = {}

export default AuthorizeScreen
// id 4b5068b4-604a-41e7-9d74-279b2c460855
// workspace 03aabdf8-75d9-48b7-b3a0-c54ea2321dd2
// owner 33a24399-fadd-417b-b98b-67b0b9f2017c
// secret_idjCeZuBRTHYgLrrgzJcgqOJpTDyMW8hbOUW4UbL3vy
