import React, { useCallback, useEffect, useState } from 'react'
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { PropTypes } from 'prop-types'
import { stepPositions } from '../../Layout'
import { Field, FormSpy } from 'react-final-form'
import _ from 'lodash'
import axios from 'axios'
import { OnChange } from 'react-final-form-listeners'

const FormCreationStepForm = ({
  setCurrentStep,
  authorizations,
  databases,
  setDatabases
}) => {
  const getDatabases = useCallback(
    async (token, form) => {
      try {
        const data = await axios.post('notion/search', { token })
        if (!_.isEmpty(_.get(data, 'data.results'))) {
          setDatabases(_.get(data, 'data.results'))
        } else {
          setDatabases([])
          if (_.has(form, 'change') && typeof form.change === 'function') {
            form.change('database', null)
          }
        }
      } catch (e) {
        console.error(e)
        setDatabases([])
        if (_.has(form, 'change') && typeof form.change === 'function') {
          form.change('database', null)
        }
      }
    },
    [setDatabases]
  )

  const getFields = useCallback(async (database, form) => {
    const properties = _.map(_.get(database, 'properties', []), (p) => ({
      property: p,
      label: _.get(p, 'name'),
      enabled: true
    }))
    form.change('fields', properties)
  }, [])

  const changeStep = useCallback(() => {
    setCurrentStep(stepPositions.FIELDS)
  }, [setCurrentStep])

  return (
    <div>
      <FormSpy subscription={{ values: true, form: true }}>
        {({ values, form }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="max-w-xl mx-auto">
                <div className="pt-4">
                  <Field
                    name="authorization"
                    defaultValue={_.get(authorizations, '[0].id')}
                  >
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
                          onChange={(e) => {
                            input.onChange(e)
                            form.change(
                              'authorization',
                              JSON.parse(e.target.value)
                            )
                          }}
                        >
                          {_.map(authorizations || [], (authorization) => (
                            <option
                              key={_.get(authorization, 'id')}
                              // value={_.get(workspace, 'id')}
                              value={JSON.stringify(authorization)}
                            >
                              {`${_.get(authorization, 'icon', '')} ${_.get(
                                authorization,
                                'name'
                              )}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </Field>
                  <OnChange name="authorization">
                    {(value, previous) => {
                      if (_.get(value, 'id') !== _.get(previous, 'id')) {
                        getDatabases(_.get(value, 'accessToken'), form)
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
                          onChange={(e) => {
                            input.onChange(e)
                            form.change('database', JSON.parse(e.target.value))
                          }}
                        >
                          <option selected disabled hidden />
                          {_.map(databases || [], (database) => (
                            <option
                              key={_.get(database, 'id')}
                              value={JSON.stringify(database)}
                            >
                              {`${_.get(database, 'icon.emoji', '')} ${_.get(
                                database,
                                'title[0].plain_text'
                              )}`}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </Field>
                  <OnChange name="database">
                    {(value, previous) => {
                      if (_.get(value, 'id') !== _.get(previous, 'id')) {
                        getFields(value, form)
                      }
                    }}
                  </OnChange>
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
                    onClick={changeStep}
                    type="button"
                    className="disabled:opacity-50 disabled:bg-primary inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    disabled={
                      !(
                        _.get(values, 'authorization.id') &&
                        _.get(values, 'database.id')
                      )
                    }
                  >
                    Select fields
                    <ArrowRightIcon
                      className="ml-2 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </FormSpy>
    </div>
  )
}
FormCreationStepForm.propTypes = {
  setCurrentStep: PropTypes.func,
  authorizations: PropTypes.array,
  databases: PropTypes.array,
  setDatabases: PropTypes.func
}

export default FormCreationStepForm
