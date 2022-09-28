import React from 'react'

const HomeLayoutSectionCTA = (props) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center justify-between gap-x-10">
        <div className="text-neutral-900 font-main w-[500px]">
          <h1 className="font-extrabold text-5xl mb-6">
            Create beautifull forms for Notion
          </h1>
          <div className="text-2xl mb-6">
            Forminotion makes it easy to fill your Notion tables by generating
            beautifull forms
          </div>
          <button
            type="button"
            className="items-center px-6 py-3 rounded-md bg-primary hover:opacity-80 text-white"
          >
            Try for free
          </button>
        </div>
        <div className="w-[600px] md:block hidden">
          <img
            src="https://tailwindui.com/img/component-images/full-width-with-sidebar.jpg"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionCTA.propTypes = {}

export default HomeLayoutSectionCTA
