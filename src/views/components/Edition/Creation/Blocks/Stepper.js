import React from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { useAuth0 } from '@auth0/auth0-react'

const FormCreationStepper = ({ steps, setCurrentStep }) => {
  /*  const steps = useMemo(() => {
    const initialSteps = [
      { order: 1, name: 'Form', status: 'UPCOMING' },
      { order: 2, name: 'Fields', status: 'UPCOMING' },
      { order: 3, name: 'Preview', status: 'UPCOMING' }
    ]
    return _.map(initialSteps, step => {
      if (_.get(step, 'order') < currentStep) {
        return { ...step, status: 'COMPLETE' }
      } else if (_.get(step, 'order') === currentStep) {
        return { ...step, status: 'CURRENT' }
      }
      return step
    })
  }, [currentStep])*/

  const { user } = useAuth0()

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
    <div>
      <div className="px-4 py-5 sm:px-6 ">
        <h2 className="text-2xl font-bold">Create a form</h2>
        <button
          onClick={handleAddToNotion}
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create new form
        </button>
      </div>
      <nav aria-label="Progress" className="mx-6 my-5 sm:mx-8 mt-3">
        <ol
          role="list"
          className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0"
        >
          {_.map(steps, (step, key) => (
            <li key={key} className="relative md:flex-1 md:flex">
              {step.status === 'COMPLETE' ? (
                <div
                  onClick={() => setCurrentStep(_.get(step, 'position'))}
                  className="group flex items-center w-full cursor-pointer"
                >
                  <span className="px-6 py-3 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary rounded-full group-hover:bg-primary-600">
                      <CheckIcon
                        className="w-4 h-4 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </div>
              ) : step.status === 'CURRENT' ? (
                <div
                  className="px-6 py-3 flex items-center text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border-2 border-primary rounded-full">
                    <span className="text-primary">{step.position}</span>
                  </span>
                  <span className="ml-3 text-xs font-medium text-primary">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="px-6 py-3  flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded-full">
                      <span className="text-gray-500">{step.position}</span>
                    </span>
                    <span className="ml-3 text-xs font-medium text-gray-500">
                      {step.name}
                    </span>
                  </span>
                </div>
              )}

              {key !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="hidden md:block absolute top-0 right-0 h-full w-5"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
FormCreationStepper.propTypes = {
  steps: PropTypes.array,
  setCurrentStep: PropTypes.func
}

export default FormCreationStepper
