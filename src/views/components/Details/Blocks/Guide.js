import React, { useMemo, useState } from 'react'
import EmbedNotion from '../../../../Images/embed-notion.gif'
import EmbedWebsite from '../../../../Images/embed-website.gif'
import _ from 'lodash'
import clsx from 'clsx'

const DetailsBlocksGuide = () => {
  const steps = useMemo(
    () => [
      {
        id: 1,
        title: 'Embed in Notiion',
        subTitle: 'In your Notion page, type "/embed" and paste the link',
        image: EmbedNotion
      },
      {
        id: 2,
        title: 'Embed in your website',
        subTitle:
          'In your code, create an html tag "<iframe>" and paste the link into the "src" attribute',
        image: EmbedWebsite
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
            <div className="mt-4 flex flex-col-reverse gap-6 2xl:flex-row">
              <div className="flex w-full items-center justify-center 2xl:w-96">
                <div className="w-[370px]">
                  <img
                    src={_.chain(steps)
                      .find((x) => _.get(x, 'id') === currentStep)
                      .get('image')
                      .value()}
                    alt="guide embed form"
                  />
                </div>
              </div>
              <div className="flex flex-row items-start gap-4 2xl:flex-col">
                {_.map(steps, (step) => (
                  <button
                    type="button"
                    className="w-full"
                    onClick={() => setCurrentStep(_.get(step, 'id'))}
                  >
                    <spans className=" flex items-start text-sm font-medium">
                      <span className="mt-0.5 flex min-w-0 flex-col text-left">
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
