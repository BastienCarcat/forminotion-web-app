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
import DateField from '../../ui/Form/Inputs/Date'
import URLField from '../../ui/Form/Inputs/URL'
import PhoneNumberField from '../../ui/Form/Inputs/PhoneNumber'
import MailField from '../../ui/Form/Inputs/Mail'
// import MultiSelectField from './Fields/MultiSelect'
import { useAxiosPost } from '../../../hooks/useAxiosPost'
import MultiSelectField from '../../ui/Form/Inputs/MultiSelect'

const MainForm = ({ databaseInfo }) => {
  const [post] = useAxiosPost()

  const initialValues = useMemo(() => {
    const defaultValues = {}
    _.each(_.get(databaseInfo, 'fields'), (field) => {
      const { idNotionField, type } = field
      switch (type) {
        case 'multi_select':
          _.set(defaultValues, idNotionField, [])
          break
        case 'rich_text':
        case 'title':
          _.set(defaultValues, idNotionField, [{ text: { content: '' } }])
          break
        case 'checkbox':
          _.set(defaultValues, idNotionField, false)
          break
        case 'select':
        case 'status':
          _.set(defaultValues, idNotionField, { name: '', id: '', color: '' })
          break
        default:
          _.set(defaultValues, idNotionField, '')
          break
      }
    })
    return defaultValues
  }, [databaseInfo])

  const onSubmit = useCallback(
    async (values) => {
      try {
        const input = {
          idDatabase: _.get(databaseInfo, 'form.idNotionDatabase'),
          token: _.get(databaseInfo, 'form.token')
        }
        _.each(_.get(databaseInfo, 'fields'), (field) => {
          const { idNotionField, type } = field
          _.set(
            input,
            `properties.${idNotionField}.${type}`,
            _.get(values, idNotionField)
          )
        })
        // switch (type) {
        // case 'title':
        //   if (values[name]) {
        //     _.set(input, `properties.${name}`, {
        //       title: [{ text: { content: values[name] } }]
        //     })
        //   }
        //   break
        // case 'rich_text':
        //   if (values[_.get(field, 'property.name')]) {
        //     _.set(input, `properties.${name}`, {
        //       rich_text: [{ text: { content: values[name] } }]
        //     })
        //   }
        //   break
        // case 'number':
        //   if (values[name]) {
        //     _.set(input, `properties.${name}`, {
        //       number: _.toNumber(values[name])
        //     })
        //   }
        //   break

        // default:
        //   if (values[name]) {
        //     _.set(
        //       input,
        //       `properties.${name}.${_.get(field, 'type')}`,
        //       values[name]
        //     )
        //   }
        //   break
        // }

        await post('notion/createDbItem', cleanDeep(input))
      } catch (e) {
        console.error(e)
      }
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
            {/*<pre>*/}
            {/*  <code>{JSON.stringify(values, null, 4)}</code>*/}
            {/*</pre>*/}
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
                      switch (_.get(field, 'type')) {
                        case 'title':
                        case 'rich_text':
                          return (
                            <TextField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'number':
                          return (
                            <NumberField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'checkbox':
                          return (
                            <div className="flex h-full">
                              <SwitchField
                                name={_.get(field, 'idNotionField')}
                                label={_.get(field, 'label')}
                              />
                            </div>
                          )

                        case 'select':
                          return (
                            <SelectField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                              options={_.get(field, 'options', [])}
                              getOptionLabel={(option) =>
                                _.get(option, 'label', '')
                              }
                            />
                          )

                        case 'status':
                          return (
                            <SelectField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                              options={_.get(field, 'options', [])}
                              getOptionLabel={(option) =>
                                _.get(option, 'label', '')
                              }
                            />
                          )

                        case 'date':
                          return (
                            <DateField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'url':
                          return (
                            <URLField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'phone_number':
                          return (
                            <PhoneNumberField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'email':
                          return (
                            <MailField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                            />
                          )

                        case 'multi_select':
                          return (
                            <MultiSelectField
                              name={_.get(field, 'idNotionField')}
                              label={_.get(field, 'label')}
                              options={_.get(field, 'options', [])}
                              getOptionLabel={(option) =>
                                _.get(option, 'label', '')
                              }
                            />
                          )

                        default:
                          return (
                            <NotAvailableField
                              label={_.get(field, 'label')}
                              type={_.get(field, 'type')}
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
