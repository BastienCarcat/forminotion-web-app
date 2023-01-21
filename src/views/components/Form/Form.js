import cleanDeep from 'clean-deep'
import _ from 'lodash'
import React, { useCallback, useMemo } from 'react'
import { Form } from 'react-final-form'
import NumberField from '../../ui/Form/Inputs/Number'
import SelectField from '../../ui/Form/Inputs/Select'
import SwitchField from '../../ui/Form/Inputs/Switch'
import PropTypes from 'prop-types'
import TextField from '../../ui/Form/Inputs/Text'
import NotAvailableField from '../../ui/Form/Inputs/NotAvailable'
import moment from 'moment'
import DateField from '../../ui/Form/Inputs/Date'
import URLField from '../../ui/Form/Inputs/URL'
import PhoneNumberField from '../../ui/Form/Inputs/PhoneNumber'
import MailField from '../../ui/Form/Inputs/Mail'
import MultiSelectField from '../../ui/Form/Inputs/MultiSelect'
import { useAxiosPostNoAuth } from '../../../hooks/useAxiosPostNoAuth'

const MainForm = ({ databaseInfo }) => {
  const [post] = useAxiosPostNoAuth()

  const initialValues = useMemo(() => {
    const defaultValues = {}
    _.each(_.get(databaseInfo, 'fields'), (field) => {
      const { idFieldNotion, property } = field
      switch (_.get(property, 'type')) {
        case 'multi_select':
          _.set(defaultValues, idFieldNotion, [])
          break
        case 'rich_text':
        case 'title':
          _.set(defaultValues, idFieldNotion, [{ text: { content: '' } }])
          break
        case 'checkbox':
          _.set(defaultValues, idFieldNotion, false)
          break
        case 'select':
        case 'status':
          _.set(defaultValues, idFieldNotion, { name: '', id: '', color: '' })
          break
        case 'date':
          _.set(defaultValues, idFieldNotion, { start: null })
          break
        default:
          _.set(defaultValues, idFieldNotion, '')
          break
      }
    })
    return defaultValues
  }, [databaseInfo])

  const onSubmit = useCallback(
    async (values) => {
      const input = {
        idDatabase: _.get(databaseInfo, 'notion.id'),
        idAuthorization: _.get(databaseInfo, 'form.idAuthorization'),
        properties: _.chain(databaseInfo)
          .get('fields', [])
          .keyBy('idFieldNotion')
          .mapValues((field, key) => {
            const type = _.get(field, 'property.type')
            switch (type) {
              case 'date':
                return {
                  [type]: _.mapValues(_.get(values, key), (x) => {
                    return x ? moment(x).format('YYYY-MM-DD') : null
                  })
                }
              default:
                return {
                  [type]: _.get(values, key)
                }
            }
          })
          .value()
      }

      await post('notion/createDbItem', cleanDeep(input))
    },
    [post, databaseInfo]
  )

  if (!databaseInfo) return <div>No database loaded</div>

  //Do a global Comp const with both name and label in common and specify Comp as the field type
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8 md:w-3/5 lg:w-1/2 w-full">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {_.get(databaseInfo, 'form.title')}
                </h3>
                {_.get(databaseInfo, 'form.description') && (
                  <p className="mt-1 text-sm text-gray-500">
                    {_.get(databaseInfo, 'form.description')}
                  </p>
                )}
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {_.map(_.get(databaseInfo, 'fields'), (field) => (
                  <div className="sm:col-span-3 " key={_.get(field, 'id')}>
                    {(() => {
                      switch (_.get(field, 'property.type')) {
                        case 'title':
                        case 'rich_text':
                          return (
                            <TextField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'number':
                          return (
                            <NumberField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'checkbox':
                          return (
                            <div className="flex h-full">
                              <SwitchField
                                name={_.get(field, 'idFieldNotion')}
                                label={_.get(field, 'label')}
                              />
                            </div>
                          )

                        case 'select':
                          return (
                            <SelectField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                              options={_.get(
                                field,
                                'property.select.options',
                                []
                              )}
                              getOptionLabel={(option) =>
                                _.get(option, 'name', '')
                              }
                            />
                          )

                        case 'status':
                          return (
                            <SelectField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                              options={_.get(
                                field,
                                'property.status.options',
                                []
                              )}
                              getOptionLabel={(option) =>
                                _.get(option, 'name', '')
                              }
                            />
                          )

                        case 'date':
                          return (
                            <DateField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'url':
                          return (
                            <URLField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'phone_number':
                          return (
                            <PhoneNumberField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'email':
                          return (
                            <MailField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'multi_select':
                          return (
                            <MultiSelectField
                              name={_.get(field, 'idFieldNotion')}
                              label={_.get(field, 'label')}
                              options={_.get(
                                field,
                                'property.multi_select.options',
                                []
                              )}
                              getOptionLabel={(option) =>
                                _.get(option, 'name', '')
                              }
                            />
                          )

                        default:
                          return (
                            <NotAvailableField
                              label={_.get(field, 'label')}
                              type={_.get(field, 'property.type')}
                            />
                          )
                      }
                    })()}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <a
                href="/"
                target="_blank"
                className="text-xs hover:underline pt-1 text-gray-400"
              >
                Powered by Forminotion
              </a>
              <button
                type="submit"
                className="mt-4 py-2 px-4 text-sm font-medium rounded-md text-white bg-primary hover:opacity-80"
              >
                Save
              </button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

MainForm.propTypes = {
  databaseInfo: PropTypes.object
}

export default MainForm
