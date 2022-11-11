import React, { useCallback } from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field, useFormState } from 'react-final-form'
import _ from 'lodash'
import { FieldArray } from 'react-final-form-arrays'

const FormCreationStepFields = ({ setCurrentStep }) => {
  // const [fields, setFields] = useState([])

  const { values } = useFormState()
  // const { change } = useForm()

  // const initialize = useCallback(async () => {
  //   try {
  //     const properties = _.map(
  //       _.get(values, 'database.properties', []),
  //       (p) => ({
  //         id: _.get(p, 'id'),
  //         name: _.get(p, 'name'),
  //         enable: true
  //       })
  //     )
  //     console.log(properties)
  //     change('fields', properties)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [change])

  // useEffect(() => {
  //   initialize()
  // }, [initialize])

  const changeStep = useCallback(() => {
    setCurrentStep(stepPositions.PREVIEW)
  }, [setCurrentStep])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-xl mx-auto">
        <FieldArray name="fields">
          {({ fields }) => (
            <div className="m-h-[70vh] overflow-auto px-2">
              {fields.map((name, index) => (
                <Field key={name} name={`${name}.enabled`} type="checkbox">
                  {({ input }) => (
                    <div
                      // className="flex border rounded-lg p-3 mt-4"
                      className="px-3 py-2 text-base sm:text-sm rounded-md flex border mt-4"
                    >
                      <div className="flex-1">
                        <label
                          htmlFor={`field-${_.get(
                            fields,
                            `value[${index}].property.id`
                          )}`}
                          className="font-medium text-gray-700 select-none"
                        >
                          {_.get(fields, `value[${index}].label`)}
                        </label>
                      </div>
                      <div className="ml-3 flex items-center">
                        <input
                          {...input}
                          id={`field-${_.get(
                            fields,
                            `value[${index}].property.id`
                          )}`}
                          type="checkbox"
                          className="focus:ring-primary h-5 w-5 text-primary border-gray-300 rounded"
                          checked={_.get(values, `fields[${index}].enabled`)}
                        />
                      </div>
                    </div>
                  )}
                </Field>
              ))}
            </div>
          )}
        </FieldArray>
        <div className="pt-4 flex justify-end">
          <button
            onClick={changeStep}
            type="button"
            className="disabled:opacity-50 disabled:bg-primary inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
  setCurrentStep: PropTypes.func
}

export default FormCreationStepFields
