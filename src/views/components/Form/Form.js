import axios from 'axios'
import cleanDeep from 'clean-deep'
import _ from 'lodash'
import React, { useMemo } from 'react'
import { Form } from 'react-final-form'
import NumberField from './Fields/Number'
import SelectField from './Fields/Select'
import SwitchField from './Fields/Switch'
import PropTypes from 'prop-types'
import TextField from './Fields/Text'

const MainForm = ({ databaseInfo }) => {
  const initialValues = useMemo(() => {
    const defaultValues = {}
    _.each(_.get(databaseInfo, 'fields'), (field) => {
      const { id, type } = _.get(field, 'property')
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
          _.set(defaultValues, id, { name: '', id: '', color: '' })
          break
        default:
          _.set(defaultValues, id, '')
          break
      }
    })
    console.log('databaseInfo', _.get(databaseInfo, 'fields'))
    return defaultValues
  }, [databaseInfo])

  const onSubmit = async (values) => {
    try {
      const input = {
        idDatabase: _.get(databaseInfo, 'idNotionDatabase'),
        token: _.get(databaseInfo, 'accessToken')
      }
      _.each(_.get(databaseInfo, 'fields'), (field) => {
        const { id, type } = _.get(field, 'property')
        if (_.get(values, id)) {
          _.set(input, `properties.${id}.${type}`, _.get(values, id))
        }
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
      console.log('input', input)
      await axios.post('notion/createDbItem', cleanDeep(input))
    } catch (e) {
      console.error(e)
    }
  }

  if (!databaseInfo) return <div>No database loaded</div>

  //Do a global Comp const with both name and label in common and specify Comp as the field type
  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8 md:w-3/5 lg:w-1/2 w-full">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => (
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            {/*<pre>*/}
            {/*  <code>{JSON.stringify(values, null, 4)}</code>*/}
            {/*</pre>*/}
            {/*<div>*/}
            <div>
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {_.get(databaseInfo, 'title')}
                  </h3>
                  {_.get(databaseInfo, 'description') && (
                    <p className="mt-1 text-sm text-gray-500">
                      {_.get(databaseInfo, 'description')}
                    </p>
                  )}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {_.map(_.get(databaseInfo, 'fields'), (field, key) => (
                    <div className="sm:col-span-3 " key={key}>
                      {(() => {
                        switch (_.get(field, 'property.type')) {
                          case 'title':
                            return (
                              <TextField
                                name={_.get(field, 'property.id')}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'number':
                            return (
                              <NumberField
                                name={_.get(field, 'property.id')}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'checkbox':
                            return (
                              <div className="flex h-full">
                                <SwitchField
                                  name={_.get(field, 'property.id')}
                                  label={_.get(field, 'label')}
                                />
                              </div>
                            )

                          case 'rich_text':
                            return (
                              <TextField
                                name={_.get(field, 'property.id')}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'select':
                            return (
                              <SelectField
                                name={_.get(field, 'property.id')}
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

                          /*  case 'multi_select':
                                return (
                                  <MultiSelectField
                                    name={_.get(field, 'property.name')}
                                label={_.get(field, 'label')}
                                    options={_.get(
                                      field,
                                      'multi_select.options',
                                      []
                                    )}
                                    getOptionLabel={option =>
                                      _.get(option, 'name', '')
                                    }
                                  />
                                )*/

                          default:
                            return (
                              <TextField
                                name={_.get(field, 'property.id')}
                                label={_.get(field, 'label')}
                              />
                            )
                        }
                      })()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <a
                href="#"
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
            {/*</div>*/}
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
