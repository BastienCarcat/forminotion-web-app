import React from 'react'
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field } from 'react-final-form'
import _ from 'lodash'

const FormCreationStepForm = ({ setCurrentStep }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-xl mx-auto">
        <div className="pt-4">
          <Field name="workspace">
            {({ input }) => (
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="Notion Workspace"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notion Workspace
                  </label>
                  <span className="text-sm text-gray-500">
                    {/*TODO: helper text*/}
                    {/*  <Tooltip text="helper text helper text helper text helper text ">*/}
                    <InformationCircleIcon className="h-5" />
                    {/*</Tooltip>*/}
                  </span>
                </div>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  {...input}
                >
                  <option>Bastien</option>
                  <option>Bastien 2</option>
                  <option>Bastien 3</option>
                </select>
              </div>
            )}
          </Field>
        </div>

        <div className="pt-4">
          <Field name="database">
            {({ input }) => (
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="Notion Database"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Notion Database
                  </label>
                  <span className="text-sm text-gray-500">
                    {/*TODO: helper text*/}
                    {/*  <Tooltip text="helper text helper text helper text helper text ">*/}
                    <InformationCircleIcon className="h-5" />
                    {/*</Tooltip>*/}
                  </span>
                </div>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  {...input}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            )}
          </Field>
        </div>

        <div className="pt-4">
          <Field name="title">
            {({ input }) => (
              <div>
                <label
                  htmlFor="Form title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Form title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    {...input}
                  />
                </div>
              </div>
            )}
          </Field>
        </div>

        <div className="pt-4">
          <Field name="description">
            {({ input }) => (
              <div>
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={2}
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    {...input}
                  />
                </div>
              </div>
            )}
          </Field>
        </div>
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => setCurrentStep(stepPositions.FIELDS)}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Select fields
            <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
FormCreationStepForm.propTypes = {
  setCurrentStep: PropTypes.func
}

export default FormCreationStepForm
