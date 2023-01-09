import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../ui/Globals/Loader'
import MainForm from './Form'
import { useAxiosGetNoAuth } from '../../../hooks/useAxiosGetNoAuth'

const FormLayout = () => {
  const [databaseInfo, setDatabaseInfo] = useState(null)

  const { idForm } = useParams()

  const [get, loading] = useAxiosGetNoAuth()

  useEffect(() => {
    async function init() {
      const response = await get('form/getById', {
        params: { id: idForm }
      })

      setDatabaseInfo(response)
    }
    init()
  }, [idForm, get])

  if (loading) return <Loader />

  return <MainForm databaseInfo={databaseInfo} />
}

FormLayout.propTypes = {}

export default FormLayout
