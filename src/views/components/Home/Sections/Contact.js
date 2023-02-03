import React, { useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const HomeLayoutSectionContact = () => {
  const { loginWithRedirect } = useAuth0()

  const start = useCallback(async () => {
    try {
      await loginWithRedirect({
        screen_hint: 'signup'
      })
    } catch (e) {
      console.error(e)
    }
  }, [loginWithRedirect])

  return (
    <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col items-center">
        <span className="block text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Still have questions?
        </span>
        <a
          href="mailto:contact@forminotion.com"
          className="group text-center text-2xl font-extrabold tracking-tight text-primary text-gray-900 transition duration-100 sm:text-3xl"
        >
          Contact us!
          <span className="block h-0.5 max-w-0 bg-primary transition-all duration-300 group-hover:max-w-full "></span>
        </a>
        <div className="mt-8 flex">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={start}
              className="items-center rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-600"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionContact.propTypes = {}

export default HomeLayoutSectionContact
