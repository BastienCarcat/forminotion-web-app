import axios from 'axios'
import { useCallback, useState } from 'react'
import _ from 'lodash'
import { useAuth0 } from '@auth0/auth0-react'

export const useAxiosPost = () => {
  const [loading, setLoading] = useState(false)

  const { getAccessTokenSilently } = useAuth0()

  const post = useCallback(
    async (url, data, config = {}) => {
      try {
        setLoading(true)

        const token = await getAccessTokenSilently()

        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`
          },
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

  return [post, loading]
}
