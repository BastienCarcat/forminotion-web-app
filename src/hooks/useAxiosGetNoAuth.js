import axios from 'axios'
import { useCallback, useState } from 'react'
import _ from 'lodash'

export const useAxiosGetNoAuth = () => {
  const [loading, setLoading] = useState(false)

  const get = useCallback(async (url, config = {}) => {
    try {
      setLoading(true)

      const response = await axios.get(url, config)

      return _.get(response, 'data')
    } catch (e) {
      console.error(e)
      throw new Error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return [get, loading]
}
