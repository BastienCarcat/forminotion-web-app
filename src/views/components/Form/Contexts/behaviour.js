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

const ContextBehaviourForm = createContext(null)

const ProviderBehaviourForm = ({ children }) => {
  const { idForm } = useParams()
  const [localDatabases, setLocalDatabases] = useLocalStorage('databases')
  const [localDatabase, setLocalDatabase] = useState(null)

  useEffect(() => {
    const localDb = _.get(localDatabases, idForm)
    if (localDb) {
      setLocalDatabase(localDb)
    }
  }, [idForm, localDatabases])

  const linkDatabaseToForm = useCallback(
    (databaseURL) => {
      setLocalDatabases({ ...localDatabases, [idForm]: databaseURL })
    },
    [idForm, localDatabases, setLocalDatabases]
  )

  const context = useMemo(
    () => ({ linkDatabaseToForm, localDatabase }),
    [linkDatabaseToForm, localDatabase]
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
