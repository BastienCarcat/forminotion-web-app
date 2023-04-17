import PropTypes from 'prop-types'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useParams } from 'react-router-dom'
import { useAxiosGetNoAuth } from '../../../../hooks/useAxiosGetNoAuth'
import { useAxiosPostNoAuth } from '../../../../hooks/useAxiosPostNoAuth'

const ContextBehaviourForm = createContext(null)

const ProviderBehaviourForm = ({ children }) => {
  const [parentForm, setParentForm] = useState(null)
  const [loading, setLoading] = useState(true)

  const { idForm } = useParams()

  const [get, loadingGet] = useAxiosGetNoAuth()
  const [post, loadingPost] = useAxiosPostNoAuth()

  useEffect(() => {
    if (loadingPost || loadingGet) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [loadingPost, loadingGet])

  useEffect(() => {
    const init = async () => {
      const form = await get('form/getFormById', {
        params: { idForm }
      })
      setParentForm(form)
    }
    init()
  }, [idForm, get])

  const context = useMemo(
    () => ({
      parentForm,
      loading
    }),
    [parentForm, loading]
  )

  return (
    <ContextBehaviourForm.Provider value={context}>
      {children}
    </ContextBehaviourForm.Provider>
  )
}

const useContextForm = () => {
  const context = useContext(ContextBehaviourForm)

  if (context === undefined) {
    throw new Error('useContextForm must be used within a ContextBehaviourForm')
  }

  return context
}

export { ProviderBehaviourForm, useContextForm }

ProviderBehaviourForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
