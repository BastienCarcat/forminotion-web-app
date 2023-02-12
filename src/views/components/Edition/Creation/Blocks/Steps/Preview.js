import React from 'react'
import { PropTypes } from 'prop-types'
import { FormSpy } from 'react-final-form'
import _ from 'lodash'

import { CheckIcon } from '@heroicons/react/outline'
import TextField from '../../../../../ui/Form/Inputs/Text'
import NumberField from '../../../../../ui/Form/Inputs/Number'
import SwitchField from '../../../../../ui/Form/Inputs/Switch'
import SelectField from '../../../../../ui/Form/Inputs/Select'
import DateField from '../../../../../ui/Form/Inputs/Date'
import URLField from '../../../../../ui/Form/Inputs/URL'
import PhoneNumberField from '../../../../../ui/Form/Inputs/PhoneNumber'
import MailField from '../../../../../ui/Form/Inputs/Mail'
import MultiSelectField from '../../../../../ui/Form/Inputs/MultiSelect'
import NotAvailableField from '../../../../../ui/Form/Inputs/NotAvailable'
import Loader from '../../../../../ui/Globals/Loader'

const FormCreationStepPreview = ({ loading }) => {
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
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="relative inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-primary-600 disabled:bg-primary disabled:opacity-50"
                  disabled={
                    !(
                      _.get(values, 'authorization.id') &&
                      _.get(values, 'database.id')
                    ) || loading
                  }
                >
                  {loading && (
                    <Loader
                      className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-[inherit] bg-[inherit]"
                      size={18}
                    />
                  )}
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
  loading: PropTypes.bool
}

export default FormCreationStepPreview
