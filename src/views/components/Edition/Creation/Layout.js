import React, { useCallback, useMemo, useState, useEffect } from 'react'
import FormCreationStepper from './Blocks/Stepper'
import _ from 'lodash'
import FormCreationStepForm from './Blocks/Steps/Form'
import { Form } from 'react-final-form'
import axios from 'axios'
import FormCreationStepFields from './Blocks/Steps/Fields'
import arrayMutators from 'final-form-arrays'
import FormCreationStepPreview from './Blocks/Steps/Preview'
import { useAuth0 } from '@auth0/auth0-react'

export const stepPositions = Object.freeze({
  FORM: 1,
  FIELDS: 2,
  PREVIEW: 3
})

export const stepStatus = Object.freeze({
  COMPLETE: 'COMPLETE',
  CURRENT: 'CURRENT',
  UPCOMING: 'UPCOMING'
})

const FormCreationLayout = (props) => {
  const [steps, setSteps] = useState([
    { position: stepPositions.FORM, name: 'Form', status: stepStatus.CURRENT },
    {
      position: stepPositions.FIELDS,
      name: 'Fields',
      status: stepStatus.UPCOMING
    },
    {
      position: stepPositions.PREVIEW,
      name: 'Preview',
      status: stepStatus.UPCOMING
    }
  ])

  const [initialValues, setInitialValues] = useState({ fields: null })
  const [authorizations, setAuthorizations] = useState([])
  const [databases, setDatabases] = useState([])

  const { user } = useAuth0()

  const currentStep = useMemo(() => {
    return _.find(steps, (step) => _.get(step, 'status') === stepStatus.CURRENT)
  }, [steps])

  const setCurrentStep = useCallback(
    (position) => {
      const newPositions = _.map(_.cloneDeep(steps), (x) => {
        if (_.get(x, 'position') < position) {
          return { ...x, status: stepStatus.COMPLETE }
        } else if (_.get(x, 'position') === position) {
          return { ...x, status: stepStatus.CURRENT }
        } else if (_.get(x, 'position') > position) {
          return { ...x, status: stepStatus.UPCOMING }
        }
        return { ...x }
      })
      setSteps(newPositions)
    },
    [steps]
  )

  const onSubmit = useCallback(
    async (values, initialValues, form) => {
      try {
        const input = {
          title: _.get(
            values,
            'title',
            _.get(values, 'database.title[0].plain_text')
          ),
          description: _.get(values, 'description', ''),
          idAuthorization: _.get(values, 'authorization.id'),
          idNotionDatabase: _.get(values, 'database.id'),
          fields: _.get(values, 'fields')
        }
        console.log('submit', values)
        await axios.post('form/create', { ...input })
      } catch (e) {
        console.error(e)
      }
    },
    [setCurrentStep]
  )

  // const people = [
  //   { id: 1, name: 'Durward Reynolds' },
  //   { id: 2, name: 'Kenton Towne' },
  //   { id: 3, name: 'Therese Wunsch' },
  //   { id: 4, name: 'Benedict Kessler' },
  //   { id: 5, name: 'Katelyn Rohan' }
  // ]
  // const [selectedPeople, setSelectedPeople] = useState([people[0], people[2]])

  // const handleSetSelected = person => {
  //   console.log('value', person)
  //   setSelectedPeople(person)
  // }

  const initialize = useCallback(async () => {
    try {
      const initVals = {}
      const wp = await axios.get('authorization/getAll')

      if (!_.isEmpty(_.get(wp, 'data'))) {
        setAuthorizations(_.get(wp, 'data'))

        const mainAuthorization = _.get(wp, 'data[0]')

        _.set(initVals, 'authorization', mainAuthorization)
      }

      setInitialValues(initVals)
    } catch (e) {
      console.error(e)
    }
  }, [setInitialValues])

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleAddToNotion = () => {
    window.open(
      `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=9e763688-8c89-4028-8abc-4ee8dabf6a47&response_type=code&state=${_.get(
        user,
        'email'
      )}`,
      // 'https://api.notion.com/v1/oauth/authorize?owner=user&client_id=9e763688-8c89-4028-8abc-4ee8dabf6a47&redirect_uri=https://bastiencarcat.github.io/forminotion-web-app/&response_type=code',
      '_blank',
      'location=yes,height=800,width=600,scrollbars=yes,status=yes'
    )
  }

  return (
    <>
      <FormCreationStepper steps={steps} setCurrentStep={setCurrentStep} />

      <Form
        onSubmit={onSubmit}
        // validate={validate}
        mutators={{ ...arrayMutators }}
        initialValues={initialValues}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={handleSubmit}>
            {/*<pre>*/}
            {/*  <code>{JSON.stringify(values, null, 4)}</code>*/}
            {/*</pre>*/}
            {_.isEmpty(authorizations) ? (
              <div className="mt-10 flex flex-col items-center">
                <div>
                  You need to authorize Forminotion to get access to your Notion
                  workspace.
                </div>
                <button
                  onClick={handleAddToNotion}
                  type="button"
                  className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Get authorization
                </button>
              </div>
            ) : (
              <>
                {_.get(currentStep, 'position') === stepPositions.FORM && (
                  <FormCreationStepForm
                    setCurrentStep={setCurrentStep}
                    authorizations={authorizations}
                    setDatabases={setDatabases}
                    databases={databases}
                  />
                )}
                {_.get(currentStep, 'position') === stepPositions.FIELDS && (
                  <FormCreationStepFields setCurrentStep={setCurrentStep} />
                )}
                {_.get(currentStep, 'position') === stepPositions.PREVIEW && (
                  <FormCreationStepPreview setCurrentStep={setCurrentStep} />
                )}
              </>
            )}

            {/*<div className="fixed top-16 w-72">
        <Listbox
          value={selectedPeople}
          onChange={value => handleSetSelected(value)}
          multiple
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selectedPeople.map(person => person.name).join(', ')}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selectedPeople.includes(person)
                              ? 'font-medium'
                              : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selectedPeople.includes(person) ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>*/}
          </form>
        )}
      />
    </>
  )
}

FormCreationLayout.propTypes = {}

export default FormCreationLayout
