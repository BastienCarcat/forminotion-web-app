import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../ui/Globals/Loader'
import MainForm from './Form'
import { useAxiosGet } from '../../../hooks/useAxiosGet'

const FormLayout = () => {
  const [databaseInfo, setDatabaseInfo] = useState(null)

  const { idForm } = useParams()

  const [get, loading] = useAxiosGet()

  useEffect(() => {
    async function init() {
      const response = await get(
        'form/getById',
        {
          params: { id: idForm }
        },
        { noAuth: true }
      )

      setDatabaseInfo(response)
    }
    init()
  }, [idForm, get])

  if (loading) return <Loader />

  return <MainForm databaseInfo={databaseInfo} />
}

FormLayout.propTypes = {}

export default FormLayout
