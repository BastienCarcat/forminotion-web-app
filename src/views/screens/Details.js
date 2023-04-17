import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../ui/Globals/Loader'
import PageHeader from '../ui/Page/Header'
import { useNavigate, useParams } from 'react-router-dom'
import AppBar from '../components/Global/AppBar'
import { useAxiosGet } from '../../hooks/useAxiosGet'
import Details from '../components/Details/Layout'
import _ from 'lodash'
import { PencilIcon } from '@heroicons/react/solid'

const FormDetailsScreen = () => {
  const { idForm } = useParams()
  const [form, setForm] = useState(null)
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [get, loading] = useAxiosGet()

  const getDatabaseInfo = useCallback(async () => {
    const form = await get('form/getFormById', {
      params: { idForm }
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
    <AppBar>
      <PageHeader
        title={_.get(form, 'form.title')}
        loading={loading}
        actions={[
          <button
            key={0}
            type="button"
            onClick={() => navigate(`/edition/${idForm}`)}
            className="inline-flex items-center rounded-md border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Edit</span>
          </button>
        ]}
      />
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="mx-auto h-full w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <Details form={form} />
          )}
        </div>
      </div>
    </AppBar>
  )
}

FormDetailsScreen.propTypes = {}

export default withAuthenticationRequired(FormDetailsScreen, {
  onRedirecting: () => <Loader />
})
