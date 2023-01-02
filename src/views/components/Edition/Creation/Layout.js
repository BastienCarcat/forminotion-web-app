import React, { useCallback, useMemo, useState, useEffect } from 'react'
import FormCreationStepper from './Blocks/Stepper'
import _ from 'lodash'
import FormCreationStepForm from './Blocks/Steps/Form'
import { Form } from 'react-final-form'
import FormCreationStepFields from './Blocks/Steps/Fields'
import arrayMutators from 'final-form-arrays'
import FormCreationStepPreview from './Blocks/Steps/Preview'
import { useAuth0 } from '@auth0/auth0-react'
import { useAxiosGet } from '../../../../hooks/useAxiosGet'
import { useAxiosPost } from '../../../../hooks/useAxiosPost'
import Loader from '../../../ui/Globals/Loader'

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

const FormCreationLayout = () => {
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

  // todo: make a context ?
  const [authorizations, setAuthorizations] = useState([])
  //State here to prevent re-init when goback
  const [databases, setDatabases] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useAuth0()
  const [get] = useAxiosGet()
  const [post] = useAxiosPost()

  const initialValues = useMemo(() => {
    return {
      fields: null,
      database: null,
      authorization: !_.isEmpty(authorizations) ? _.head(authorizations) : null
    }
  }, [authorizations])

  const currentStep = useMemo(() => {
    return _.find(steps, (step) => _.get(step, 'status') === stepStatus.CURRENT)
  }, [steps])

  const searhDatabases = useCallback(
    async (authorization) => {
      try {
        const data = await post('notion/search', {
          token: _.get(authorization, 'accessToken')
        })
        if (!_.isEmpty(_.get(data, 'results'))) {
          setDatabases(_.get(data, 'results'))
        } else {
          setDatabases([])
        }
      } catch (e) {
        setDatabases([])
        throw new Error(e)
      }
    },
    [setDatabases, post]
  )

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
    async (values) => {
      // try {
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

      await post('form/create', input)
      // } catch (e) {
      //   console.error(e)
      // }
    },
    [post]
  )

  const initialize = useCallback(async () => {
    try {
      setLoading(true)
      const wp = await get('authorization/getAll')

      if (!_.isEmpty(wp)) {
        setAuthorizations(wp)
        await searhDatabases(_.head(wp))
      }
    } catch (e) {
      throw new Error(e)
    } finally {
      setLoading(false)
    }
  }, [get, searhDatabases])

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleAddToNotion = () => {
    window.open(
      `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${
        process.env.REACT_APP_NOTION_CLIENT_ID
      }&response_type=code&state=${_.get(user, 'email')}`,
      '_blank',
      'location=yes,height=800,width=600,scrollbars=yes,status=yes'
    )
  }

  return (
    <>
      <section aria-labelledby="form-link-copy">
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-4">
            <h2
              className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl"
              id="form-link-copy"
            >
              Form creation
            </h2>
            <FormCreationStepper
              steps={steps}
              setCurrentStep={setCurrentStep}
            />

            {loading ? (
              <Loader />
            ) : (
              <Form
                onSubmit={onSubmit}
                // validate={validate}
                mutators={{ ...arrayMutators }}
                initialValues={initialValues}
                a
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    {_.isEmpty(authorizations) ? (
                      <div className="mt-10 flex flex-col items-center">
                        <div>
                          You need to authorize Forminotion to get access to
                          your Notion workspace.
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
                        {_.get(currentStep, 'position') ===
                          stepPositions.FORM && (
                          <FormCreationStepForm
                            setCurrentStep={setCurrentStep}
                            authorizations={authorizations}
                            searhDatabases={searhDatabases}
                            databases={databases}
                          />
                        )}
                        {_.get(currentStep, 'position') ===
                          stepPositions.FIELDS && (
                          <FormCreationStepFields
                            setCurrentStep={setCurrentStep}
                          />
                        )}
                        {_.get(currentStep, 'position') ===
                          stepPositions.PREVIEW && (
                          <FormCreationStepPreview
                            setCurrentStep={setCurrentStep}
                          />
                        )}
                      </>
                    )}
                  </form>
                )}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

FormCreationLayout.propTypes = {}

export default FormCreationLayout
