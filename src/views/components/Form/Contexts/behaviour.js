import PropTypes from 'prop-types'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import useLocalStorage from '../../../../hooks/useLocalStorage'
import _ from 'lodash'
import { useParams } from 'react-router-dom'
import { useAxiosGetNoAuth } from '../../../../hooks/useAxiosGetNoAuth'
import { useAxiosPostNoAuth } from '../../../../hooks/useAxiosPostNoAuth'

const ContextBehaviourForm = createContext(null)

const ProviderBehaviourForm = ({ children }) => {
  const { idForm } = useParams()
  const [localDatabases, setLocalDatabases] = useLocalStorage('databases')
  const [localDatabase, setLocalDatabase] = useState(null)
  const [form, setForm] = useState(null)

  const [get, loadingGet] = useAxiosGetNoAuth()
  const [post, loadingPost] = useAxiosPostNoAuth()

  useEffect(() => {
    const localDb = _.get(localDatabases, idForm)
    if (localDb) {
      setLocalDatabase(localDb)
      if (_.get(localDb, 'isAuthorized')) {
        getFormByIdDatabase(_.get(localDb, 'idDatabase'))
      }
    }
  }, [idForm])

  const getDatabaseById = useCallback(
    async (idDatabase) => {
      const response = await get('form/getByIdDatabase', {
        params: { idDatabase }
      })

      if (response) {
        setForm(response)
      }

      const newItem = {
        idDatabase,
        ...(_.get(response, 'form.idAuthorization') && {
          isAuthorized: true
        })
      }

      setLocalDatabases({
        ...localDatabases,
        [idForm]: newItem
      })
      setLocalDatabase(newItem)
    },
    [get, localDatabases, setLocalDatabases, idForm]
  )

  const getFormByIdDatabase = useCallback(
    async (idDatabase) => {
      const response = await get('form/getByIdDatabase', {
        params: { idDatabase }
      })

      if (response) {
        setForm(response)
      }
    },
    [get]
  )

  const updateIdDatabase = useCallback(
    async (idDatabase) => {
      const response = await get('form/getByIdDatabase', {
        params: { idDatabase }
      })
      if (response) {
        setForm(response)
      } else {
        await post('form/update', {
          id: _.get(form, 'form.id'),
          idDatabase
        })

        setForm({
          ...form,
          form: {
            ..._.get(form, 'form'),
            idDatabase
          }
        })

        const newItem = {
          ...localDatabase,
          idDatabase
        }

        setLocalDatabases({
          ...localDatabases,
          [idForm]: newItem
        })
        setLocalDatabase(newItem)
        await getFormByIdDatabase(idDatabase)
      }
    },
    [
      getFormByIdDatabase,
      localDatabase,
      get,
      post,
      form,
      localDatabases,
      setLocalDatabase,
      setLocalDatabases,
      idForm
    ]
  )

  const clearStorage = useCallback(() => {
    setLocalDatabases({})
  }, [setLocalDatabases])

  const context = useMemo(
    () => ({
      localDatabase,
      getDatabaseById,
      form,
      updateIdDatabase,
      clearStorage
    }),
    [localDatabase, getDatabaseById, form, updateIdDatabase, clearStorage]
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
