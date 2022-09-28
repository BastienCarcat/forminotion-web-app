import React from 'react'

const HomeLayoutSectionContact = (props) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="flex items-center flex-col">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">
          <span className="block">Still have questions?</span>
          <span className="block text-primary mt-4">Contact us!</span>
        </h2>
        <div className="mt-8 flex">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:opacity-80"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionContact.propTypes = {}

export default HomeLayoutSectionContact
