import React from 'react'
import _ from 'lodash'
import TextField from '../../../../../ui/Form/Inputs/Text'
import NumberField from '../../../../../ui/Form/Inputs/Number'
import SwitchField from '../../../../../ui/Form/Inputs/Switch'
import SelectField from '../../../../../ui/Form/Inputs/Select'
import StatusField from '../../../../../ui/Form/Inputs/Status'
import DateField from '../../../../../ui/Form/Inputs/Date'
import URLField from '../../../../../ui/Form/Inputs/URL'
import PhoneNumberField from '../../../../../ui/Form/Inputs/PhoneNumber'
import MailField from '../../../../../ui/Form/Inputs/Mail'
import MultiSelectField from '../../../../../ui/Form/Inputs/MultiSelect'
import NotAvailableField from '../../../../../ui/Form/Inputs/NotAvailable'

const FieldsBlocksFormBlocksFormLayout = () => {
  const formInfo = {}
  return (
    <div className="pt-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {_.get(formInfo, 'form.title')}
        </h3>
        {_.get(formInfo, 'form.description') && (
          <p className="mt-1 text-sm text-gray-500">
            {_.get(formInfo, 'form.description')}
          </p>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {_.chain(formInfo)
          .get('fields', [])
          .orderBy('order')
          .map((field) => (
            <div className="sm:col-span-3 " key={_.get(field, 'id')}>
              {(() => {
                switch (_.get(field, 'property.type')) {
                  case 'title':
                  case 'rich_text':
                    return (
                      <TextField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                      />
                    )

                  case 'number':
                    return (
                      <NumberField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                      />
                    )

                  case 'checkbox':
                    return (
                      <div className="flex h-full">
                        <SwitchField
                          name={_.get(field, 'idProperty')}
                          label={_.get(field, 'label')}
                        />
                      </div>
                    )

                  case 'select':
                    return (
                      <SelectField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                        options={_.get(field, 'property.select.options', [])}
                        getOptionLabel={(option) => _.get(option, 'name', '')}
                        optionColor
                      />
                    )

                  case 'status':
                    return (
                      <StatusField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                        options={_.get(field, 'property.status.options', [])}
                        groups={_.get(field, 'property.status.groups', [])}
                        getOptionLabel={(option) => _.get(option, 'name', '')}
                        optionColor
                      />
                    )

                  case 'date':
                    return (
                      <DateField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                      />
                    )

                  case 'url':
                    return (
                      <URLField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                      />
                    )

                  case 'phone_number':
                    return (
                      <PhoneNumberField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                      />
                    )

                  case 'email':
                    return (
                      <MailField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                      />
                    )

                  case 'multi_select':
                    return (
                      <MultiSelectField
                        name={_.get(field, 'idProperty')}
                        label={_.get(field, 'label')}
                        options={_.get(
                          field,
                          'property.multi_select.options',
                          []
                        )}
                        getOptionLabel={(option) => _.get(option, 'name', '')}
                        optionColor
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
    </div>
  )
}

FieldsBlocksFormBlocksFormLayout.propTypes = {}

export default FieldsBlocksFormBlocksFormLayout
