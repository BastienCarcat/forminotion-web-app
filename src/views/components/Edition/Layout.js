import React, { useCallback, useMemo } from 'react'
import AppBar from '../Global/AppBar'
import PageHeader from '../../ui/Page/Header'
import _ from 'lodash'
import { PencilIcon } from '@heroicons/react/solid'
import Loader from '../../ui/Globals/Loader'
import FormEditionFormLayout from './Blocks/Form/Layout'
import { useContextFormEdition } from './Contexts/behaviour'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'

export const DraggableTypes = Object.freeze({ FIELD: 'FIELD' })

const FormEditionLayout = () => {
  const { loading, form, updateFormAndFields } = useContextFormEdition()

  const initialValues = useMemo(() => {
    //   const defaultValues = {}

    const getDefaultValue = (type) => {
      switch (type) {
        case 'multi_select':
          return []
        case 'rich_text':
        case 'title':
          return [{ text: { content: '' } }]
        case 'checkbox':
          return false
        case 'select':
        case 'status':
          return {
            name: null,
            id: null,
            color: null
          }
        case 'date':
          return { start: null }
        default:
          return ''
      }
    }

    return {
      form: {
        title: _.get(form, 'form.title'),
        description: _.get(form, 'form.description')
      },
      fields: _.chain(form)
        .get('fields')
        .map((x) => ({
          ..._.pick(x, [
            'id',
            'enabled',
            'helper',
            'label',
            'order',
            'placeholder',
            'required',
            'property'
          ]),
          defaultValue: getDefaultValue(_.get(x, 'property.type'))
        }))
        .orderBy('order')
        .value()
    }
  }, [form])

  const submit = useCallback(
    (values, form) => {
      console.log('values, init', values, initialValues)
      updateFormAndFields(values)
      form.reset()
    },
    [updateFormAndFields, initialValues]
  )

  return (
    <Form
      onSubmit={submit}
      initialValues={initialValues}
      mutators={{
        ...arrayMutators
      }}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} className="h-full">
          <div className="flex h-full">
            <div className="flex-1">
              <AppBar>
                <PageHeader
                  title={_.get(form, 'form.title')}
                  loading={loading}
                  actions={[
                    <button
                      disabled={pristine || invalid}
                      key={0}
                      type="submit"
                      className="inline-flex items-center rounded-md border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary-600 disabled:opacity-50"
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

            {/*<div className="p- w-96 border-l border-gray-200 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">*/}
            {/*  <FormEditionSettingsLayout />*/}
            {/*</div>*/}
          </div>
        </form>
      )}
    />
  )
}

FormEditionLayout.propTypes = {}

export default FormEditionLayout
