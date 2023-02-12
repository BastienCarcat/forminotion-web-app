import React, { useCallback, useMemo } from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field, useFormState } from 'react-final-form'
import _ from 'lodash'
import { FieldArray } from 'react-final-form-arrays'
import clsx from 'clsx'

const FormCreationStepFields = ({ setCurrentStep, disabledFieldTypes }) => {
  const { values } = useFormState()

  const changeStep = useCallback(() => {
    setCurrentStep(stepPositions.PREVIEW)
  }, [setCurrentStep])

  const notSupportedFields = useMemo(() => {
    return _.chain(values)
      .get('fields')
      .map(
        (field) =>
          _.includes(disabledFieldTypes, _.get(field, 'property.type')) &&
          _.startCase(_.get(field, 'property.type'))
      )
      .filter((x) => !!x)
      .value()
  }, [disabledFieldTypes, values])

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <p>Select the fields you want to include in your form.</p>
      {!_.isEmpty(notSupportedFields) && (
        <div className="text-sm text-gray-500">
          {`${_.join(notSupportedFields, ', ')} ${
            _.size(notSupportedFields) === 1 ? 'field is' : 'fields are'
          } not yet supported`}
        </div>
      )}

      <div className="py-6">
        <FieldArray name="fields">
          {({ fields }) => (
            <div>
              <div className="columns-1 overflow-auto px-2 sm:columns-2 lg:columns-3">
                {fields.map((name, index) => (
                  <Field key={name} name={`${name}.enabled`} type="checkbox">
                    {({ input }) => (
                      <div
                        className={clsx(
                          'mt-4 flex rounded-md border px-3 py-2 text-base first:mt-0 sm:text-sm',
                          _.includes(
                            disabledFieldTypes,
                            _.get(fields, `value[${index}].property.type`)
                          ) && 'opacity-50'
                        )}
                      >
                        <div className="flex-1">
                          <label
                            htmlFor={`field-${_.get(
                              fields,
                              `value[${index}].property.id`
                            )}`}
                            className="cursor-pointer select-none font-medium text-gray-700"
                          >
                            {_.get(fields, `value[${index}].label`)}
                          </label>
                        </div>
                        <div className="ml-3 flex items-center">
                          <input
                            disabled={_.includes(
                              disabledFieldTypes,
                              _.get(fields, `value[${index}].property.type`)
                            )}
                            {...input}
                            id={`field-${_.get(
                              fields,
                              `value[${index}].property.id`
                            )}`}
                            type="checkbox"
                            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary focus:ring-transparent"
                            checked={_.get(values, `fields[${index}].enabled`)}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
              </div>
            </div>
          )}
        </FieldArray>
        <div className="flex justify-end pt-4">
          <button
            onClick={changeStep}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-primary-600 disabled:bg-primary disabled:opacity-50"
            disabled={
              !_.find(
                _.get(values, 'fields', []),
                (field) => _.get(field, 'enabled') === true
              )
            }
          >
            See preview
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
FormCreationStepFields.propTypes = {
  setCurrentStep: PropTypes.func,
  disabledFieldTypes: PropTypes.array
}

export default FormCreationStepFields
