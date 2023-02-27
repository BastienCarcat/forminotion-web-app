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
import { PencilIcon } from '@heroicons/react/solid'

const FormEditionScreen = () => {
  const { idForm } = useParams()
  const [form, setForm] = useState(null)

  const [get, loading] = useAxiosGet()

  // const initialValues = useMemo(() => {
  //   const defaultValues = {
  //     fieldsValue: null
  //   }
  //   _.each(_.get(form, 'fields'), (field) => {
  //     const { idFieldNotion, property } = field
  //     switch (_.get(property, 'type')) {
  //       case 'multi_select':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, [])
  //         break
  //       case 'rich_text':
  //       case 'title':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, [
  //           { text: { content: '' } }
  //         ])
  //         break
  //       case 'checkbox':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, false)
  //         break
  //       case 'select':
  //       case 'status':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, {
  //           name: null,
  //           id: null,
  //           color: null
  //         })
  //         break
  //       case 'date':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, { start: null })
  //         break
  //       default:
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, '')
  //         break
  //     }
  //   })
  //   return defaultValues
  // }, [form])

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
    // <Form
    //   onSubmit={() => {}}
    //   initialValues={initialValues}
    //   render={({ handleSubmit }) => (
    //     <form
    //       className="space-y-8 divide-y divide-gray-200"
    //       onSubmit={handleSubmit}
    //     >
    <div className="flex h-full">
      <div className="flex-1">
        <AppBar>
          <PageHeader
            title={_.get(form, 'form.title')}
            loading={loading}
            actions={[
              <button
                key={0}
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600"
              >
                <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                <span>Save the change</span>
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
    //     </form>
    //   )}
    // />
  )
}

FormEditionScreen.propTypes = {}

export default withAuthenticationRequired(FormEditionScreen, {
  onRedirecting: () => <Loader />
})
