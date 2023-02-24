import React, { useState, useMemo } from 'react'
import _ from 'lodash'
import { Form } from 'react-final-form'
import TextField from '../../../../ui/Form/Inputs/Text'
import NumberField from '../../../../ui/Form/Inputs/Number'
import SwitchField from '../../../../ui/Form/Inputs/Switch'
import SelectField from '../../../../ui/Form/Inputs/Select'
import StatusField from '../../../../ui/Form/Inputs/Status'
import DateField from '../../../../ui/Form/Inputs/Date'
import URLField from '../../../../ui/Form/Inputs/URL'
import PhoneNumberField from '../../../../ui/Form/Inputs/PhoneNumber'
import MailField from '../../../../ui/Form/Inputs/Mail'
import MultiSelectField from '../../../../ui/Form/Inputs/MultiSelect'
import NotAvailableField from '../../../../ui/Form/Inputs/NotAvailable'
import Loader from '../../../../ui/Globals/Loader'
import PropTypes from 'prop-types'
import DragSVG from '../../../../ui/Icons/DragSVG'

const FormEditionBlockForm = ({ form }) => {
  const [loading, setLoading] = useState(false)

  const initialValues = useMemo(() => {
    const defaultValues = {}
    _.each(_.get(form, 'fields'), (field) => {
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
          _.set(defaultValues, idFieldNotion, {
            name: null,
            id: null,
            color: null
          })
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
  }, [form])

  return (
    <section aria-labelledby="form-link-copy">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <Form
            onSubmit={() => {}}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <form
                className="space-y-8 divide-y divide-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {_.get(form, 'form.title')}
                    </h3>
                    {_.get(form, 'form.description') && (
                      <p className="mt-1 text-sm text-gray-500">
                        {_.get(form, 'form.description')}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {_.map(_.get(form, 'fields'), (field) => (
                      <div className="sm:col-span-3" key={_.get(field, 'id')}>
                        {(() => {
                          switch (_.get(field, 'property.type')) {
                            case 'title':
                            case 'rich_text':
                              return (
                                <TextField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                />
                              )

                            case 'number':
                              return (
                                <NumberField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                />
                              )

                            case 'checkbox':
                              return (
                                <div className="flex h-full">
                                  <SwitchField
                                    name={_.get(field, 'idFieldNotion')}
                                    label={
                                      <DraggableFieldLabel
                                        label={_.get(field, 'label')}
                                      />
                                    }
                                  />
                                </div>
                              )

                            case 'select':
                              return (
                                <SelectField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                  options={_.get(
                                    field,
                                    'property.select.options',
                                    []
                                  )}
                                  getOptionLabel={(option) =>
                                    _.get(option, 'name', '')
                                  }
                                  optionColor
                                />
                              )

                            case 'status':
                              return (
                                <StatusField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                  options={_.get(
                                    field,
                                    'property.status.options',
                                    []
                                  )}
                                  groups={_.get(
                                    field,
                                    'property.status.groups',
                                    []
                                  )}
                                  getOptionLabel={(option) =>
                                    _.get(option, 'name', '')
                                  }
                                  optionColor
                                />
                              )

                            case 'date':
                              return (
                                <DateField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                />
                              )

                            case 'url':
                              return (
                                <URLField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                />
                              )

                            case 'phone_number':
                              return (
                                <PhoneNumberField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                />
                              )

                            case 'email':
                              return (
                                <MailField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                />
                              )

                            case 'multi_select':
                              return (
                                <MultiSelectField
                                  name={_.get(field, 'idFieldNotion')}
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
                                  options={_.get(
                                    field,
                                    'property.multi_select.options',
                                    []
                                  )}
                                  getOptionLabel={(option) =>
                                    _.get(option, 'name', '')
                                  }
                                  optionColor
                                />
                              )

                            default:
                              return (
                                <NotAvailableField
                                  label={
                                    <DraggableFieldLabel
                                      label={_.get(field, 'label')}
                                    />
                                  }
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
                    className="pt-1 text-xs text-gray-400 hover:underline"
                  >
                    Powered by Forminotion
                  </a>
                  <button
                    disabled={loading}
                    type="submit"
                    className="relative mt-4 rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80 disabled:bg-primary disabled:opacity-50"
                  >
                    {loading && (
                      <Loader
                        className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-[inherit] bg-[inherit]"
                        size={18}
                      />
                    )}
                    Save
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </section>
  )
}

FormEditionBlockForm.propTypes = {
  form: PropTypes.object
}

const DraggableFieldLabel = ({ label }) => (
  <div className="flex items-center">
    <DragSVG className="mr-1 cursor-move text-lg" />
    {label}
  </div>
)

DraggableFieldLabel.propTypes = {
  label: PropTypes.string
}

export default FormEditionBlockForm
