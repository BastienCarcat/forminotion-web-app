import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../ui/Globals/Loader'
import MainForm from './Form'
import { useAxiosGetNoAuth } from '../../../hooks/useAxiosGetNoAuth'
import _ from 'lodash'
import Warning from '../../../Images/warning.svg'

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

  if (loading)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Loader />
      </div>
    )

  if (
    _.get(databaseInfo, 'notion.deleted') ||
    _.get(databaseInfo, 'notion.archived')
  ) {
    return (
      <div className="h-full w-full flex justify-center items-center flex-col p-8">
        <div className="text-gray-900 text-xl max-w-lg text-center">Oops!</div>
        <div className="text-gray-900 text-md max-w-lg text-center mt-2">
          This form is no longer available.
        </div>
        <img
          className="w-64 h-auto my-6"
          src={Warning}
          alt="warning illustration"
        />
        <div className="text-gray-900 text-md max-w-lg text-center">
          It seems that the notion database linked to this form has been
          deleted.
          {_.get(databaseInfo, 'notion.archived') && (
            <>
              <a
                href={_.get(databaseInfo, 'notion.url')}
                className="underline text-gray-800 mx-1"
                target="_blank"
                rel="noreferrer"
              >
                Click here
              </a>
              to restore it.
            </>
          )}
        </div>
      </div>
    )
  }

  return <MainForm databaseInfo={databaseInfo} />
}

FormLayout.propTypes = {}

export default FormLayout
