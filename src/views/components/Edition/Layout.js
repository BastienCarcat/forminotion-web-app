import React from 'react'
import AppBar from '../Global/AppBar'
import PageHeader from '../../ui/Page/Header'
import _ from 'lodash'
import { PencilIcon } from '@heroicons/react/solid'
import Loader from '../../ui/Globals/Loader'
import FormEditionSettingsLayout from './Blocks/Settings/Layout'
import FormEditionFormLayout from './Blocks/Form/Layout'
import { useContextFormEdition } from './Contexts/behaviour'

export const DraggableTypes = Object.freeze({ FIELD: 'FIELD' })

const FormEditionLayout = () => {
  const { loading, form } = useContextFormEdition()

  return (
    <>
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
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
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
                  <FormEditionFormLayout />
                )}
              </div>
            </div>
          </AppBar>
        </div>

        <div className="p- w-96 border-l border-gray-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <FormEditionSettingsLayout />
        </div>
      </div>
    </>
  )
}

FormEditionLayout.propTypes = {}

export default FormEditionLayout
