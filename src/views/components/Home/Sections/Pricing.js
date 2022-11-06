import React, { useMemo } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import clsx from 'clsx'

const HomeLayoutSectionPricing = () => {
  const pricing = useMemo(
    () => ({
      tiers: [
        {
          title: 'Basic',
          price: 'Free',
          frequency: '',
          description:
            'Everything you need to create and embed forms anywhere!',
          features: [
            '5 products',
            'Up to 1,000 subscribers',
            'Basic analytics',
            '48-hour support response time'
          ],
          cta: 'Start now',
          mostPopular: false
        },
        {
          title: 'Pro',
          price: 19,
          frequency: '/month',
          description:
            'Create your own branding with the customization tools and more! ',
          features: [
            '25 products',
            'Up to 10,000 subscribers',
            'Advanced analytics',
            '24-hour support response time',
            'Marketing automations'
          ],
          cta: 'Start 7 days trial',
          mostPopular: true
        },
        {
          title: 'Enterprise',
          price: 49,
          frequency: '/month',
          description: 'Start collaborate with your team.',
          features: [
            'Unlimited products',
            'Unlimited subscribers',
            'Advanced analytics',
            '1-hour, dedicated support response time',
            'Marketing automations',
            'Custom integrations'
          ],
          cta: 'Start 7 days trial',
          mostPopular: false
        }
      ]
    }),
    []
  )

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="max-w-7xl mx-auto py-24 px-4 bg-white sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
          Need more features ?
        </h2>
        <p className="mt-6 max-w-2xl text-xl text-gray-500">
          Start creating forms for free, then upgrade your account to access
          extra features!
        </p>

        <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.title}
              className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {tier.title}
                </h3>
                {tier.mostPopular ? (
                  <p className="absolute top-0 py-1.5 px-4 bg-primary rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                    Most popular
                  </p>
                ) : null}
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {tier.price !== 'Free' && '$'}
                    {tier.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">
                    {tier.frequency}
                  </span>
                </p>
                <p className="mt-6 text-gray-500">{tier.description}</p>

                {/* Feature list */}
                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckIcon
                        className="flex-shrink-0 w-6 h-6 text-primary"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#"
                className={clsx(
                  'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium',
                  tier.mostPopular
                    ? 'bg-primary text-white hover:opacity-80'
                    : 'bg-primary-100 text-primary hover:bg-opacity-80'
                )}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionPricing.propTypes = {}

export default HomeLayoutSectionPricing
