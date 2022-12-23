import React from 'react'
import { PropTypes } from 'prop-types'
import { FormSpy } from 'react-final-form'
import _ from 'lodash'
import TextField from '../../../../Form/Fields/Text'
import NumberField from '../../../../Form/Fields/Number'
import SwitchField from '../../../../Form/Fields/Switch'
import SelectField from '../../../../Form/Fields/Select'
import DateField from '../../../../Form/Fields/Date'
import URLField from '../../../../Form/Fields/URL'
import PhoneNumberField from '../../../../Form/Fields/PhoneNumber'
import MailField from '../../../../Form/Fields/Mail'
import MultiSelectField from '../../../../Form/Fields/MultiSelect'
import NotAvailableField from '../../../../Form/Fields/NotAvailable'
import { CheckIcon } from '@heroicons/react/outline'

const FormCreationStepPreview = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <p>This is a preview of your new form. </p>
      <div className="py-6">
        <FormSpy subscription={{ values: true }}>
          {({ values }) => (
            <>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {_.chain(values)
                  .get('fields')
                  .filter((field) => _.get(field, 'enabled'))
                  .map((field) => (
                    <div
                      className="sm:col-span-3 "
                      key={_.get(field, 'property.id')}
                    >
                      {(() => {
                        switch (_.get(field, 'property.type')) {
                          case 'title':
                          case 'rich_text':
                            return (
                              <TextField
                                name={`fakeData.${_.get(field, 'property.id')}`}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'number':
                            return (
                              <NumberField
                                name={`fakeData.${_.get(field, 'property.id')}`}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'checkbox':
                            return (
                              <div className="flex h-full">
                                <SwitchField
                                  name={`fakeData.${_.get(
                                    field,
                                    'property.id'
                                  )}`}
                                  label={_.get(field, 'label')}
                                />
                              </div>
                            )

                          case 'select':
                            return (
                              <SelectField
                                name={`fakeData.${_.get(field, 'property.id')}`}
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
                                name={`fakeData.${_.get(field, 'property.id')}`}
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
                                name={`fakeData.${_.get(field, 'property.id')}`}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'url':
                            return (
                              <URLField
                                name={`fakeData.${_.get(field, 'property.id')}`}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'phone_number':
                            return (
                              <PhoneNumberField
                                name={`fakeData.${_.get(field, 'property.id')}`}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'email':
                            return (
                              <MailField
                                name={`fakeData.${_.get(field, 'property.id')}`}
                                label={_.get(field, 'label')}
                              />
                            )

                          case 'multi_select':
                            return (
                              <MultiSelectField
                                name={`fakeData.${_.get(field, 'property.id')}`}
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
                  ))
                  .value()}
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="disabled:opacity-50 disabled:bg-primary inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600"
                  disabled={
                    !(
                      _.get(values, 'authorization.id') &&
                      _.get(values, 'database.id')
                    )
                  }
                >
                  Create
                  <CheckIcon
                    className="ml-2 -mr-1 h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </>
          )}
        </FormSpy>
      </div>
    </div>
  )
}
FormCreationStepPreview.propTypes = {
  setCurrentStep: PropTypes.func
}

export default FormCreationStepPreview
