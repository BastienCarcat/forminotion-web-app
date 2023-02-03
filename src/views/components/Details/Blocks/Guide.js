import React, { useMemo, useState } from 'react'
import Image from '../../../../Images/guide-create.svg'
import Image2 from '../../../../Images/guide-select.svg'
import _ from 'lodash'
import clsx from 'clsx'

const DetailsBlocksGuide = () => {
  const steps = useMemo(
    () => [
      {
        id: 1,
        title: 'Copy',
        subTitle: 'Description',
        image: Image
      },
      {
        id: 2,
        title: 'Copy',
        subTitle: 'Description',
        image: Image2
      },
      {
        id: 3,
        title: 'Copy',
        subTitle: 'Description',
        image: Image
      }
    ],
    []
  )

  const [currentStep, setCurrentStep] = useState(_.get(steps, '[0].id'))

  return (
    <>
      <section aria-labelledby="form-link-copy">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-4">
            <h2
              className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl"
              id="form-link-copy"
            >
              How to embed your form ?
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-6">
              <div className="mt-14 w-96">
                <img
                  src={_.chain(steps)
                    .find((x) => _.get(x, 'id') === currentStep)
                    .get('image')
                    .value()}
                  alt="guide create form"
                />
              </div>
              <div>
                {_.map(steps, (step) => (
                  <button
                    type="button"
                    className="w-full"
                    onClick={() => setCurrentStep(_.get(step, 'id'))}
                  >
                    <span
                      className={clsx(
                        'absolute top-0 left-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                        currentStep === _.get(step, 'id')
                          ? 'bg-primary'
                          : 'bg-red-400'
                      )}
                      aria-hidden="true"
                    />
                    <spans className="my-3 flex items-start text-sm font-medium">
                      <span className="flex-shrink-0">
                        <span
                          className={clsx(
                            'flex h-10 w-10 items-center justify-center rounded-full border-2',
                            currentStep === _.get(step, 'id')
                              ? 'border-primary'
                              : 'border-gray-500'
                          )}
                        >
                          <span
                            className={clsx(
                              currentStep === _.get(step, 'id')
                                ? 'text-primary'
                                : 'text-gray-900'
                            )}
                          >
                            {_.get(step, 'id')}
                          </span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col text-left">
                        <span
                          className={clsx(
                            'text-xs font-semibold uppercase tracking-wide',
                            currentStep === _.get(step, 'id')
                              ? 'text-primary'
                              : 'text-gray-900'
                          )}
                        >
                          {_.get(step, 'title')}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {_.get(step, 'subTitle')}
                        </span>
                      </span>
                    </spans>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

DetailsBlocksGuide.propTypes = {}

export default DetailsBlocksGuide
