import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../ui/Globals/Loader'
import PageHeader from '../ui/Page/Header'
import { useParams } from 'react-router-dom'
import AppBar from '../components/Global/AppBar'
import { useAxiosGet } from '../../hooks/useAxiosGet'
import Details from '../components/Details/Layout'
import _ from 'lodash'
import { PencilIcon } from '@heroicons/react/outline'

const FormDetailsScreen = () => {
  const { idForm } = useParams()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)

  const [get] = useAxiosGet()

  const getDatabaseInfo = useCallback(async () => {
    try {
      setLoading(true)
      const form = await get('form/getById', {
        params: { id: idForm }
      })

      setForm(form)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [get, idForm])

  useEffect(() => {
    async function init() {
      await getDatabaseInfo()
    }
    init()
  }, [getDatabaseInfo])

  return (
    <AppBar>
      <PageHeader
        title={_.get(form, 'title')}
        actions={[
          <button
            key={0}
            type="button"
            // onClick={() => navigate('/edition')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Edit</span>
          </button>
        ]}
      />
      <div className="bg-gray-100 flex-1 overflow-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full lg:py-8 py-4">
          {loading ? (
            <div className="h-full justify-center flex">
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
