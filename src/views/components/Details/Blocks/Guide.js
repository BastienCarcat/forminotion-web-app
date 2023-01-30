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
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-4">
            <h2
              className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl"
              id="form-link-copy"
            >
              How to embed your form ?
            </h2>
            <div className="grid grid-cols-2 gap-x-6 mt-4">
              <div className="w-96 mt-14">
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
                        'absolute top-0 left-0 w-1 h-full lg:w-full lg:h-1 lg:bottom-0 lg:top-auto',
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
                            'w-10 h-10 flex items-center justify-center border-2 rounded-full',
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
                      <span className="text-left mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span
                          className={clsx(
                            'text-xs font-semibold tracking-wide uppercase',
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
