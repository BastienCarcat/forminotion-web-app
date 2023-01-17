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
      <div className="text-sm text-gray-500">
        {`${_.join(notSupportedFields, ', ')} ${
          _.size(notSupportedFields) === 1 ? 'field is' : 'fields are'
        } not yet supported`}
      </div>
      <div className="py-6">
        <FieldArray name="fields">
          {({ fields }) => (
            <div>
              <div className="overflow-auto px-2 sm:columns-2 columns-1 lg:columns-3">
                {fields.map((name, index) => (
                  <Field key={name} name={`${name}.enabled`} type="checkbox">
                    {({ input }) => (
                      <div
                        className={clsx(
                          'px-3 py-2 text-base sm:text-sm rounded-md flex border mt-4 first:mt-0',
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
                            className="font-medium text-gray-700 select-none cursor-pointer"
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
                            className="focus:ring-transparent h-5 w-5 text-primary border-gray-300 rounded cursor-pointer"
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
        <div className="pt-4 flex justify-end">
          <button
            onClick={changeStep}
            type="button"
            className="disabled:opacity-50 disabled:bg-primary inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600"
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
