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

const ContextBehaviourForm = createContext(null)

const ProviderBehaviourForm = ({ children }) => {
  const { idForm } = useParams()
  const [localDatabases, setLocalDatabases] = useLocalStorage('databases')
  const [localDatabase, setLocalDatabase] = useState(null)
  const [form, setForm] = useState(null)

  const [get, loadingGet] = useAxiosGetNoAuth()

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

      if (response && _.get(response, 'form.idAuthorization')) {
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
      setForm(response)
    },
    [get]
  )

  // const linkDatabaseToForm = useCallback(
  //   (databaseURL) => {
  //     const idDatabase = _.chain(databaseURL)
  //       .split('/')
  //       .last()
  //       .split('?')
  //       .head()
  //       .split('', 32)
  //       .thru((chunks) => {
  //         return [
  //           chunks.slice(0, 8).join(''),
  //           chunks.slice(8, 12).join(''),
  //           chunks.slice(12, 16).join(''),
  //           chunks.slice(16, 20).join(''),
  //           chunks.slice(20).join('')
  //         ]
  //       })
  //       .join('-')
  //       .value()
  //
  //     setLocalDatabases({
  //       ...localDatabases,
  //       [idForm]: {
  //         idDatabase
  //       }
  //     })
  //   },
  //   [idForm, localDatabases, setLocalDatabases]
  // )

  const context = useMemo(
    () => ({ localDatabase, getDatabaseById, form }),
    [localDatabase, getDatabaseById, form]
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
