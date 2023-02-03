import React, { useCallback } from 'react'
import AppScreen from '../../../../Images/app-screenshot.svg'
import { useAuth0 } from '@auth0/auth0-react'

const HomeLayoutSectionCTA = () => {
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-10 sm:px-6 lg:px-8">
        <div className="w-[500px] font-main text-neutral-900">
          <h1 className="mb-6 text-5xl font-extrabold">
            Create beautifull forms for Notion
          </h1>
          <div className="mb-6 text-2xl">
            Forminotion makes it easy to fill your Notion tables by generating
            beautifull forms
          </div>
          <button
            onClick={start}
            type="button"
            className="items-center rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-600"
          >
            Try for free
          </button>
        </div>
        <div className="hidden w-[600px] md:block">
          <img src={AppScreen} alt="App screenshot" />
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionCTA.propTypes = {}

export default HomeLayoutSectionCTA
