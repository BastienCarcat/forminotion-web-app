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
          'Start by registering by clicking "Try For Free" and connecting it to your Notion account. This will enable Forminotion to access all Notion databases you shared with us and allow you to start using the form generator.',
        image: SignIn,
        alt: 'Register illustration'
      },
      {
        title: 'Select your Notion database',
        description:
          "Once you've connected your accounts, you'll be able to select the Notion database you want to create a form for. This can be any database you have set up in Notion and shared with us.",
        image: Select,
        alt: 'Select form illustration'
      },
      {
        title: 'Create your form',
        description:
          "You can now start creating your form using Forminotion's easy-to-use form generator. You'll be able to customize your form to fit your specific needs, including choosing which fields to include.",
        image: Create,
        alt: 'Create form illustration'
      },
      {
        title: 'Embed your form everywhere!',
        description:
          'You can now easily embed your form anywhere you want : on your website, Notion workspace, blog, or anywhere else you want to collect data. This way, you can collect information from anyone, anywhere, and all the data will be stored in your Notion database.',
        image: Share,
        alt: 'Embed form illustration'
      }
    ],
    []
  )

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-secondary">Guide</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-primary sm:text-4xl">
            How to create a form ?
          </p>
        </div>

        <div className="mt-16">
          <dl>
            {instructions.map((x, key) => (
              <div
                key={key}
                className={clsx(
                  'mb-10 flex flex-col gap-y-10 md:gap-x-8',
                  key % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                <div className="relative flex flex-col justify-center md:w-1/2">
                  <dt>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-white">
                      <span className="text-xl text-white">{key + 1}</span>
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      {x.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {x.description}
                  </dd>
                </div>
                <div className="align-center flex justify-center md:w-1/2">
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
