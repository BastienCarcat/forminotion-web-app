import React from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

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

  return (
    <>
      <nav aria-label="Progress" className="mx-6 my-6 sm:mx-8">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {_.map(steps, (step, key) => (
            <li key={key} className="relative md:flex md:flex-1">
              {step.status === 'COMPLETE' ? (
                <div
                  onClick={() => setCurrentStep(_.get(step, 'position'))}
                  className="group flex w-full cursor-pointer items-center"
                >
                  <span className="flex items-center px-6 py-3 text-sm font-medium">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary-600">
                      <CheckIcon
                        className="h-4 w-4 text-white"
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
                  className="flex items-center px-6 py-3 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-primary">{step.position}</span>
                  </span>
                  <span className="ml-3 text-sm font-medium text-primary">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="flex items-center  px-6 py-3 text-sm font-medium">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                      <span className="text-gray-500">{step.position}</span>
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                  </span>
                </div>
              )}

              {key !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute top-0 right-0 hidden h-full w-5 md:block"
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
    </>
  )
}
FormCreationStepper.propTypes = {
  steps: PropTypes.array,
  setCurrentStep: PropTypes.func
}

export default FormCreationStepper
