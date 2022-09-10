import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import cleanDeep from 'clean-deep'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Form } from 'react-final-form'
import NumberField from './Fields/Number'
import SelectField from './Fields/Select'
import SwitchField from './Fields/Switch'
import TextField from './Fields/Text'
import Loader from '../../ui/Globals/Loader'
import { useParams } from 'react-router-dom'

const MainForm = () => {
  //TODO: put databaseInfo in a context
  const [databaseInfo, setDatabaseInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  const { isAuthenticated } = useAuth0()
  const { idForm } = useParams()

  const initialValues = useMemo(() => {
    const init = {}
    _.chain(_.get(databaseInfo, 'fields'))
      .values()
      .map((field) => {
        if (_.get(field, 'property.type') === 'multi_select') {
          _.set(init, _.get(field, 'name'), [])
        }
        return init
      })
      .value()
    return init
  }, [databaseInfo])

  const retrieveDatabaseInfo = async () => {
    try {
      setLoading(true)
      const data = await axios.get('form/getById', {
        params: { id: idForm }
      })

      return _.get(data, 'data')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function init() {
      const response = await retrieveDatabaseInfo()
      setDatabaseInfo(response)
    }
    init()
  }, [])

  const onSubmit = async (values) => {
    try {
      const input = {
        idDatabase: _.get(databaseInfo, 'idNotionDatabase'),
        token: _.get(databaseInfo, 'accessToken')
      }
      _.chain(_.get(databaseInfo, 'fields'))
        .forEach((field) => {
          const { name, type } = _.get(field, 'property')
          switch (type) {
            case 'title':
              if (values[name]) {
                _.set(input, `properties.${name}`, {
                  title: [{ text: { content: values[name] } }]
                })
              }
              break
            case 'rich_text':
              if (values[_.get(field, 'property.name')]) {
                _.set(input, `properties.${name}`, {
                  rich_text: [{ text: { content: values[name] } }]
                })
              }
              break
            case 'number':
              if (values[name]) {
                _.set(input, `properties.${name}`, {
                  number: _.toNumber(values[name])
                })
              }
              break

            default:
              if (values[name]) {
                _.set(
                  input,
                  `properties.${name}.${_.get(field, 'type')}`,
                  values[name]
                )
              }
              break
          }
        })
        .value()
      await axios.post('notion/createDbItem', cleanDeep(input))
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <Loader />

  if (!isAuthenticated) return <div>Not connected</div>

  if (!databaseInfo) return <div>No database loaded</div>

  //Do a global Comp const with both name and label in common and specify Comp as the field type
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <code>{JSON.stringify(values, null, 4)}</code>
            <div className="w-96">
              {_.map(_.get(databaseInfo, 'fields'), (field, key) => (
                <div key={key} className="py-2">
                  {(() => {
                    switch (_.get(field, 'property.type')) {
                      case 'title':
                        return (
                          <TextField
                            name={_.get(field, 'property.name')}
                            label={_.get(field, 'label')}
                          />
                        )

                      case 'number':
                        return (
                          <NumberField
                            name={_.get(field, 'property.name')}
                            label={_.get(field, 'label')}
                          />
                        )

                      case 'checkbox':
                        return (
                          <div className="flex justify-center">
                            <SwitchField
                              name={_.get(field, 'property.name')}
                              label={_.get(field, 'label')}
                            />
                          </div>
                        )

                      case 'rich_text':
                        return (
                          <TextField
                            name={_.get(field, 'property.name')}
                            label={_.get(field, 'label')}
                          />
                        )

                      case 'select':
                        return (
                          <SelectField
                            name={_.get(field, 'property.name')}
                            label={_.get(field, 'label')}
                            options={_.get(field, 'select.options', [])}
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
                        return <div>Field not found</div>
                    }
                  })()}
                </div>
              ))}
              <div className="flex p-2 justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Validate
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </>
  )
}

MainForm.propTypes = {}

export default MainForm
