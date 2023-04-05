import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../ui/Globals/Loader'
import useLocalStorage from '../../hooks/useLocalStorage'
import _ from 'lodash'

const AuthorizeScreen = () => {
  const { idAuthorization } = useParams()
  const [authorization, setAuthorization] = useLocalStorage('authorization')

  useEffect(() => {
    if (idAuthorization) {
      if (authorization && !_.isEqual(authorization, idAuthorization)) {
        console.log('Multi workspace not allowed yet')
        return
      }

      if (!authorization) {
        setAuthorization(idAuthorization)
        // console.log('window', window)
        window.close()
      }
    }
  }, [idAuthorization, authorization, setAuthorization])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  )
}

AuthorizeScreen.propTypes = {}

export default AuthorizeScreen
