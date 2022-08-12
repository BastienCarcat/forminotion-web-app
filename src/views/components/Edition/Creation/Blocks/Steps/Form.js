import React, { useCallback, useEffect, useState } from 'react'
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field } from 'react-final-form'
import _ from 'lodash'
import axios from 'axios'
import { OnChange } from 'react-final-form-listeners'

const FormCreationStepForm = ({ setCurrentStep }) => {
  const [workspaces, setWorkspaces] = useState([])
  const [databases, setDatabases] = useState([])
  // const { change } = useForm()
  // const { values } = useFormState()

  const getWorkspaces = useCallback(async () => {
    try {
      const data = await axios.get('workspace/getAll')
      setWorkspaces(_.get(data, 'data'))
    } catch (e) {
      console.error(e)
    }
  }, [])

  const getDatabases = useCallback(async () => {
    try {
      const data = await axios.post('notion/search')
      setDatabases(_.get(data, 'data.results'))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    if (_.isEmpty(workspaces)) {
      getWorkspaces()
    }
  }, [workspaces, getWorkspaces])

  useEffect(() => {
    console.log('databases', databases)
  }, [databases])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-xl mx-auto">
        <div className="pt-4">
          <Field name="workspace" defaultValue={_.get(workspaces, '[0].id')}>
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
                  // onChange={(e) => {
                  //   input.onChange(e)
                  //   console.log('changed')
                  // }}
                  {...input}
                >
                  {_.map(workspaces || [], (workspace) => (
                    <option
                      key={_.get(workspace, 'id')}
                      value={_.get(workspace, 'id')}
                      // value={workspace}
                    >
                      {`${_.get(workspace, 'icon', '')} ${_.get(
                        workspace,
                        'name'
                      )}`}
                    </option>
                  ))}
                  {/*<option>e</option>*/}
                </select>
              </div>
            )}
          </Field>
          <OnChange name="workspace">
            {(value, previous) => {
              if (value !== previous) {
                getDatabases()
              }
            }}
          </OnChange>
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
                  <option selected disabled hidden />
                  {_.map(databases || [], (database) => (
                    <option
                      key={_.get(database, 'id')}
                      value={_.get(database, 'id')}
                      // value={workspace}
                    >
                      {`${_.get(database, 'icon', '')} ${_.get(
                        database,
                        'title[0].plain_text'
                      )}`}
                    </option>
                  ))}
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
