import axios from 'axios'
import { useCallback, useState } from 'react'
import _ from 'lodash'

export const useAxiosPostNoAuth = () => {
  const [loading, setLoading] = useState(false)

  const post = useCallback(async (url, data, config = {}) => {
    try {
      setLoading(true)

      const response = await axios.post(url, data, config)

      return _.get(response, 'data')
    } catch (e) {
      console.error(e)
      throw new Error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return [post, loading]
}
