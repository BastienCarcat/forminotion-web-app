import React, { useCallback, useMemo } from 'react'
import FormBlocksFormLayout from './Blocks/Form/Layout'
import { Form } from 'react-final-form'
import _ from 'lodash'
import { useContextForm } from './Contexts/behaviour'

const FormLayout = () => {
  const { parentForm } = useContextForm()

  const formInfo = {}
  const initialValues = useMemo(() => {
    const defaultValues = {}
    _.each(_.get(formInfo, 'fields'), (field) => {
      const { idProperty, property } = field
      switch (_.get(property, 'type')) {
        case 'multi_select':
          _.set(defaultValues, idProperty, [])
          break
        case 'rich_text':
        case 'title':
          _.set(defaultValues, idProperty, [{ text: { content: '' } }])
          break
        case 'checkbox':
          _.set(defaultValues, idProperty, false)
          break
        case 'select':
        case 'status':
          _.set(defaultValues, idProperty, {
            name: null,
            id: null,
            color: null
          })
          break
        case 'date':
          _.set(defaultValues, idProperty, { start: null })
          break
        default:
          _.set(defaultValues, idProperty, '')
          break
      }
    })
    return defaultValues
  }, [formInfo])

  const onSubmit = useCallback(async (values, form) => {
    console.log('submit', values)
  }, [])
  console.log('parentForm', parentForm)
  return (
    <div className="mx-auto w-full max-w-2xl px-6 md:w-3/5 lg:w-1/2 lg:px-8">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <FormBlocksFormLayout />
          </form>
        )}
      />
    </div>
  )
}

FormLayout.propTypes = {}

export default FormLayout
