import React, { useCallback } from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field, FormSpy, useForm } from 'react-final-form'
import _ from 'lodash'
import SelectField from '../../../../ui/Form/Inputs/Select'

const FormCreationStepForm = ({
  setCurrentStep,
  authorizations,
  databases,
  searhDatabases,
  disabledFieldTypes
}) => {
  const { change, batch } = useForm()

  const getFields = useCallback(
    (database) => {
      const properties = _.chain(database)
        .get('properties', [])
        .filter(
          (x) =>
            !_.includes(
              [
                'created_by',
                'created_time',
                'last_edited_by',
                'last_edited_time',
                'relation',
                'rollup',
                'people'
              ],
              _.get(x, 'type')
            )
        )
        .map((p) => ({
          property: p,
          label: _.get(p, 'name'),
          enabled: !_.includes(disabledFieldTypes, _.get(p, 'type'))
        }))
        .value()

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
            _.set(defaultValues, id, { name: null, id: null, color: null })
            break
          case 'date':
            _.set(defaultValues, id, { start: null })
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
    [batch, change, disabledFieldTypes]
  )

  const changeStep = useCallback(() => {
    setCurrentStep(stepPositions.FIELDS)
  }, [setCurrentStep])

  return (
    <>
      <FormSpy subscription={{ values: true }}>
        {({ values }) => (
          <>
            <div className="px-4 py-6 sm:px-6 lg:px-12">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-2 pt-4 lg:col-span-1">
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

                <div className="col-span-2 pt-4 lg:col-span-1">
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

                <div className="col-span-2 pt-4">
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            {...input}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>

                <div className="col-span-2 pt-4">
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            {...input}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={changeStep}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-primary-600 disabled:bg-primary disabled:opacity-50"
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
  databases: PropTypes.array,
  disabledFieldTypes: PropTypes.array
}

export default FormCreationStepForm
