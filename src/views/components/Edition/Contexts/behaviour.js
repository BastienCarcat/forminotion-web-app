import PropTypes from 'prop-types'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useAxiosGet } from '../../../../hooks/useAxiosGet'

const ContextBehaviourFormEdition = createContext(null)

const ProviderBehaviourFormEdition = ({ idForm, children }) => {
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)

  const [get] = useAxiosGet()

  const getFormById = useCallback(async () => {
    try {
      setLoading(true)

      const form = await get('form/getById', {
        params: { id: idForm }
      })
      setForm(form)
    } catch (e) {
      throw new Error(e)
    } finally {
      setLoading(false)
    }
  }, [get, idForm])

  useEffect(() => {
    if (idForm) {
      getFormById()
    }
  }, [idForm])

  const context = useMemo(
    () => ({
      form,
      idForm,
      loading
    }),
    [form, idForm, loading]
  )

  return (
    <ContextBehaviourFormEdition.Provider value={context}>
      {children}
    </ContextBehaviourFormEdition.Provider>
  )
}

const useContextFormEdition = () => {
  const context = useContext(ContextBehaviourFormEdition)

  if (context === undefined) {
    throw new Error(
      'useContextFormEdition must be used within a ContextBehaviourFormEdition'
    )
  }

  return context
}

export { ProviderBehaviourFormEdition, useContextFormEdition }

ProviderBehaviourFormEdition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  idForm: PropTypes.string
}
