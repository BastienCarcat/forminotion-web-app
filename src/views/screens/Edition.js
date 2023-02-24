import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../ui/Globals/Loader'
import PageHeader from '../ui/Page/Header'
import { useParams } from 'react-router-dom'
import AppBar from '../components/Global/AppBar'
import { useAxiosGet } from '../../hooks/useAxiosGet'
import _ from 'lodash'
import FormEditionLayout from '../components/Edition/Layout'
import FormEditionSettingsLayout from '../components/Edition/Blocks/Settings/Layout'

const FormEditionScreen = () => {
  const { idForm } = useParams()
  const [form, setForm] = useState(null)

  const [get, loading] = useAxiosGet()

  const getDatabaseInfo = useCallback(async () => {
    const form = await get('form/getById', {
      params: { id: idForm }
    })
    setForm(form)
  }, [get, idForm])

  useEffect(() => {
    const init = async () => {
      await getDatabaseInfo()
    }
    init()
  }, [getDatabaseInfo])

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <AppBar>
          <PageHeader title={_.get(form, 'form.title')} loading={loading} />
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="mx-auto h-full w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <FormEditionLayout form={form} />
              )}
            </div>
          </div>
        </AppBar>
      </div>

      <div className="p- w-96 border-l border-gray-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <FormEditionSettingsLayout />
      </div>
    </div>
  )
}

FormEditionScreen.propTypes = {}

export default withAuthenticationRequired(FormEditionScreen, {
  onRedirecting: () => <Loader />
})
