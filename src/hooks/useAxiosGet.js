import axios from 'axios'
import { useCallback, useState } from 'react'
import _ from 'lodash'
import { useAuth0 } from '@auth0/auth0-react'

export const useAxiosGet = () => {
  const [loading, setLoading] = useState(false)

  const { getAccessTokenSilently } = useAuth0()

  const get = useCallback(
    async (url, config = {}, opt = { noAuth: false }) => {
      try {
        setLoading(true)

        const token = await getAccessTokenSilently()

        const response = await axios.get(url, {
          ...(_.get(opt, 'noAuth') || {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          ...config
        })

        return _.get(response, 'data')
      } catch (e) {
        console.error(e)
        throw new Error(e)
      } finally {
        setLoading(false)
      }
    },
    [getAccessTokenSilently]
  )

  return [get, loading]
}
