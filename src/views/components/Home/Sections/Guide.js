import React, { useMemo } from 'react'
import clsx from 'clsx'
import Create from '../../../../Images/guide-create.svg'
import Select from '../../../../Images/guide-select.svg'
import Share from '../../../../Images/guide-share.svg'
import SignIn from '../../../../Images/guide-sign-in.svg'

const HomeLayoutSectionGuide = () => {
  const instructions = useMemo(
    () => [
      {
        title: 'Register and connect to Notion',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        image: SignIn,
        alt: 'Create illustration'
      },
      {
        title: 'Select a Notion database',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        image: Select,
        alt: 'Create illustration'
      },
      {
        title: 'Create your form',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        image: Create,
        alt: 'Create illustration'
      },
      {
        title: 'Embed your form everywhere!',
        description:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
        image: Share,
        alt: 'Create illustration'
      }
    ],
    []
  )

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-secondary">Guide</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-primary sm:text-4xl">
            How to create a form ?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-16">
          <dl>
            {instructions.map((x, key) => (
              <div
                key={key}
                className={clsx(
                  'md:gap-x-8 gap-y-10 flex flex-col mb-10',
                  key % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                <div className="relative flex justify-center flex-col md:w-1/2">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-white">
                      <span className="text-white text-xl">{key + 1}</span>
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      {x.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {x.description}
                  </dd>
                </div>
                <div className="flex align-center justify-center md:w-1/2">
                  <div className="w-[350px]">
                    <img src={x.image} alt={x.alt} />
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionGuide.propTypes = {}

export default HomeLayoutSectionGuide
