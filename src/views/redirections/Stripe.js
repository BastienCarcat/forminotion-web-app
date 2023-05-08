import React, { useEffect } from 'react'
import Loader from '../ui/Globals/Loader'
import _ from 'lodash'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

const StripeRedirect = () => {
  const { user } = useAuth0()

  useEffect(() => {
    const init = async () => {
      window.location.href = `https://buy.stripe.com/8wMdU1gGe9XB3fi001?client_reference_id=${_.chain(
        user
      )
        .get('sub')
        .replace('|', '')
        .value()}`
    }
    init()
  }, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  )
}

StripeRedirect.propTypes = {}

export default withAuthenticationRequired(StripeRedirect, {
  onRedirecting: () => (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  )
})
