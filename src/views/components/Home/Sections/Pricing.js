import React, { useMemo, useCallback } from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useAuth0 } from '@auth0/auth0-react'

const HomeLayoutSectionPricing = () => {
  const { loginWithRedirect } = useAuth0()

  const start = useCallback(
    async (opt = {}) => {
      try {
        await loginWithRedirect(opt)
      } catch (e) {
        console.error(e)
      }
    },
    [loginWithRedirect]
  )

  const contact = useCallback(() => {
    window.location.href = 'mailto:contact@forminotion.com'
  }, [])

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
            'Unlimited number of forms',
            '1 notion workspace',
            'Integrate anywhere',
            '48h support response time'
          ],
          cta: 'Start now',
          mostPopular: false,
          onClick: start
        },
        {
          title: 'Premium',
          price: 14,
          frequency: '/month',
          description:
            'Create your own branding with the customization tools and more! ',
          features: [
            'Everything in Basic plan',
            'Form customization',
            'Advanced features',
            'Priority Support'
          ],
          cta: 'Contact us',
          mostPopular: true,
          onClick: contact
        },
        {
          title: 'Professional',
          price: 39,
          frequency: '/month',
          description: 'Start collaborate with your team.',
          features: [
            'Everything in Premium plan',
            'Multiple Notion workspaces',
            'Multiple users',
            'Form analytics'
          ],
          cta: 'Contact us',
          mostPopular: false,
          onClick: contact
        }
      ]
    }),
    [contact, start]
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

              <button
                onClick={tier.onClick}
                type="button"
                className={clsx(
                  'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium',
                  tier.mostPopular
                    ? 'bg-primary text-white hover:bg-primary-600'
                    : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                )}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionPricing.propTypes = {}

export default HomeLayoutSectionPricing
