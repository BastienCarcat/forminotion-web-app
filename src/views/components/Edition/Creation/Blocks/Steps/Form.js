import React, { useCallback } from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field, FormSpy, useForm } from 'react-final-form'
import _ from 'lodash'
import SelectField from '../../../../../ui/Form/Inputs/Select'

const FormCreationStepForm = ({
  setCurrentStep,
  authorizations,
  databases,
  searhDatabases
}) => {
  const { change, batch } = useForm()

  const getFields = useCallback(
    (database) => {
      const properties = _.map(_.get(database, 'properties', []), (p) => ({
        property: p,
        label: _.get(p, 'name'),
        enabled: true
      }))

      const defaultValues = {}
      _.each(properties, (field) => {
        const { id, type } = _.get(field, 'property', {})
        switch (type) {
          case 'multi_select':
            _.set(defaultValues, id, [])
            break
          case 'rich_text':
          case 'title':
            _.set(defaultValues, id, [{ text: { content: '' } }])
            break
          case 'checkbox':
            _.set(defaultValues, id, false)
            break
          case 'select':
          case 'status':
            _.set(defaultValues, id, { name: '', id: '', color: '' })
            break
          default:
            _.set(defaultValues, id, '')
            break
        }
      })

      batch(() => {
        change('fields', properties)
        change('fakeData', defaultValues)
      })
    },
    [batch, change]
  )

  const changeStep = useCallback(() => {
    setCurrentStep(stepPositions.FIELDS)
  }, [setCurrentStep])

  return (
    <>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => (
          <>
            <div className="px-4 sm:px-6 lg:px-12 py-6">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="pt-4 col-span-2 lg:col-span-1">
                  <SelectField
                    name="authorization"
                    label="Notion Workspace"
                    options={authorizations}
                    getOptionLabel={(opt) => {
                      if (opt) {
                        return `${_.get(opt, 'icon') || ''} ${_.get(
                          opt,
                          'name'
                        )}`
                      }
                      return ''
                    }}
                    onChange={(val) => {
                      searhDatabases(val)
                      change('database', null)
                    }}
                  />
                </div>

                <div className="pt-4 col-span-2 lg:col-span-1">
                  <SelectField
                    name="database"
                    label="Notion Database"
                    options={databases}
                    disabled={!_.get(values, 'authorization')}
                    getOptionLabel={(opt) => {
                      if (opt) {
                        return `${_.get(opt, 'icon.emoji', '')} ${_.get(
                          opt,
                          'title[0].plain_text'
                        )}`
                      }
                      return ''
                    }}
                    onChange={(val) => getFields(val)}
                  />
                </div>

                <div className="pt-4 col-span-2">
                  <Field name="title">
                    {({ input }) => (
                      <div>
                        <label
                          htmlFor="Form title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Form title
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            {...input}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>

                <div className="pt-4 col-span-2">
                  <Field name="description">
                    {({ input }) => (
                      <div>
                        <label
                          htmlFor="Description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                            {...input}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={changeStep}
                  type="button"
                  className="disabled:opacity-50 disabled:bg-primary inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={
                    !(
                      _.get(values, 'authorization.id') &&
                      _.get(values, 'database.id')
                    )
                  }
                >
                  Select fields
                  <ArrowRightIcon
                    className="ml-2 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </FormSpy>
    </>
  )
}
FormCreationStepForm.propTypes = {
  setCurrentStep: PropTypes.func,
  authorizations: PropTypes.array,
  searhDatabases: PropTypes.func,
  databases: PropTypes.array
}

export default FormCreationStepForm
