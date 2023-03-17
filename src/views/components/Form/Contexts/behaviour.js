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

  const [get, loadingGet] = useAxiosGetNoAuth()

  useEffect(() => {
    const localDb = _.get(localDatabases, idForm)
    if (localDb) {
      setLocalDatabase(localDb)
    }
  }, [idForm, localDatabases])

  const getDatabaseById = useCallback(
    async (database, decodeURL = false) => {
      let idDatabase = database
      if (decodeURL) {
        idDatabase = _.chain(database)
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
      }

      const db = await get('database/getById', {
        params: { id: idDatabase }
      })

      setLocalDatabases({
        ...localDatabases,
        [idForm]: {
          idDatabase,
          ...(_.get(db, 'idAuthorization') && {
            idAuthorization: _.get(db, 'idAuthorization')
          })
        }
      })
    },
    [get, localDatabases, setLocalDatabases, idForm]
  )

  // const linkDatabaseToForm = useCallback(
  //   async (databaseURL) => {
  //     const idDatabase = _.chain(databaseURL)
  //       .split('/')
  //       .last()
  //       .split('?')
  //       .head()
  //       .value()
  //
  //     const res = await getDatabaseById(idDatabase)
  //
  //     if (!res) {
  //       setLocalDatabases({
  //         ...localDatabases,
  //         [idForm]: {
  //           idDatabase
  //         }
  //       })
  //     }
  //   },
  //   [idForm, localDatabases, setLocalDatabases, getDatabaseById]
  // )

  const context = useMemo(
    () => ({ localDatabase, getDatabaseById }),
    [localDatabase, getDatabaseById]
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
