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
  const [authorization, setAuthorization] = useLocalStorage('authorization')
  const [localDatabase, setLocalDatabase] = useState(null)
  const [form, setForm] = useState(null)

  const [get, loadingGet] = useAxiosGetNoAuth()
  const [post, loadingPost] = useAxiosPostNoAuth()

  useEffect(() => {
    const localDb = _.get(localDatabases, idForm)
    if (localDb) {
      setLocalDatabase(localDb)
      getFormByIdDatabase(_.get(localDb, 'idDatabase'))
    }
  }, [idForm])

  const callbackAuthorization = useCallback(async () => {
    const idDatabase = _.get(localDatabase, 'idDatabase')
    const response = await get('form/getByIdDatabase', {
      params: { idDatabase }
    })

    if (response) {
      setAuthorization(_.get(response, 'form.idAuthorization'))

      setForm(response)

      setLocalDatabases({
        ...localDatabases,
        [idForm]: { idDatabase }
      })
      setLocalDatabase({ idDatabase })
    }
  }, [
    get,
    localDatabases,
    setLocalDatabases,
    idForm,
    localDatabase,
    setAuthorization
  ])

  const checkUrl = useCallback(
    async (url) => {
      const idDatabase = _.chain(url)
        .split('/')
        .last()
        .split('?')
        .head()
        .split('', 32)
        .thru((chunks) => {
          return [
            chunks.slice(0, 8).join(''),
            chunks.slice(8, 12).join(''),
            chunks.slice(12, 16).join(''),
            chunks.slice(16, 20).join(''),
            chunks.slice(20).join('')
          ]
        })
        .join('-')
        .value()

      if (idDatabase) {
        const response = await get('form/getByIdDatabase', {
          params: { idDatabase }
        })

        if (response) {
          setForm(response)

          setLocalDatabases({
            ...localDatabases,
            [idForm]: { idDatabase }
          })
          setLocalDatabase({ idDatabase })

          if (!authorization) {
            setAuthorization(_.get(response, 'form.idAuthorization'))
          }
        } else {
          if (authorization) {
            const formCreated = await post('form/duplicateIfAuthorized', {
              idForm,
              idDatabase,
              idAuthorization: authorization
            })
            setForm(formCreated)
            if (_.get(formCreated, 'unauthorized')) {
              return
            }
            setForm(formCreated)

            setLocalDatabases({
              ...localDatabases,
              [idForm]: { idDatabase }
            })
            setLocalDatabase({ idDatabase })
          }
        }
      }
    },
    [
      get,
      setForm,
      setLocalDatabases,
      localDatabases,
      idForm,
      setLocalDatabase,
      authorization,
      setAuthorization,
      post
    ]
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
      callbackAuthorization,
      form,
      updateIdDatabase,
      clearStorage,
      authorization,
      checkUrl
    }),
    [
      localDatabase,
      callbackAuthorization,
      form,
      updateIdDatabase,
      clearStorage,
      authorization,
      checkUrl
    ]
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
