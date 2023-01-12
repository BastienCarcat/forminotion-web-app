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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:py-12 lg:px-8 lg:py-16">
      <div className="flex items-center flex-col">
        <span className="block text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
          Still have questions?
        </span>
        <a
          href="mailto:contact@forminotion.com"
          className="group text-primary transition duration-300 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl text-center"
        >
          Contact us!
          <span className="block max-w-0 bg-primary group-hover:max-w-full transition-all duration-500 h-0.5 "></span>
        </a>
        <div className="mt-8 flex">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={start}
              className="items-center px-6 py-3 rounded-md bg-primary hover:bg-primary-600 text-white"
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
