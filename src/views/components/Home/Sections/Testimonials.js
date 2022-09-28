import React from 'react'

const HomeLayoutSectionTestimonials = (props) => {
  return (
    <div className="max-w-7xl mx-auto md:px-6 lg:px-8 ">
      <div className="py-12 px-4 sm:px-6 md:py-16 flex flex-row items-center justify-between gap-x-12 sm:gap-x-16">
        <div className="w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-indigo-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="md:flex md:flex-col  max-w-4xl">
          <div className="md:flex-shrink-0">
            <img
              className="h-12"
              src="https://tailwindui.com/img/logos/tuple-logo-indigo-300.svg"
              alt="Tuple"
            />
          </div>
          <div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-4 h-10 w-10 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-3xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  expedita voluptas culpa sapiente alias molestiae. Numquam
                  corrupti in laborum sed rerum et corporis.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-center justify-end">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-4 text-xl">
                    <div className="font-medium text-white">Judith Black</div>
                    <div className="font-medium text-indigo-200">
                      CEO, Tuple
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-indigo-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/*<div className="py-12 px-4 border-t-2 border-indigo-900 sm:px-6 md:py-16 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-16">*/}
      {/*  <div className="md:flex-shrink-0">*/}
      {/*    <img*/}
      {/*      className="h-12"*/}
      {/*      src="https://tailwindui.com/img/logos/workcation-logo-indigo-300.svg"*/}
      {/*      alt="Workcation"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">*/}
      {/*    <div className="relative text-lg font-medium text-white md:flex-grow">*/}
      {/*      <svg*/}
      {/*        className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-600"*/}
      {/*        fill="currentColor"*/}
      {/*        viewBox="0 0 32 32"*/}
      {/*      >*/}
      {/*        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />*/}
      {/*      </svg>*/}
      {/*      <p className="relative">*/}
      {/*        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo*/}
      {/*        expedita voluptas culpa sapiente alias molestiae. Numquam corrupti*/}
      {/*        in laborum sed rerum et corporis. Nemo expedita voluptas culpa*/}
      {/*        sapiente alias molestiae.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <footer className="mt-8">*/}
      {/*      <div className="flex items-start">*/}
      {/*        <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">*/}
      {/*          <img*/}
      {/*            className="h-12 w-12 rounded-full"*/}
      {/*            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
      {/*            alt=""*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div className="ml-4">*/}
      {/*          <div className="text-base font-medium text-white">*/}
      {/*            Joseph Rodriguez*/}
      {/*          </div>*/}
      {/*          <div className="text-base font-medium text-indigo-200">*/}
      {/*            CEO, Workcation*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </footer>*/}
      {/*  </blockquote>*/}
      {/*</div>*/}
    </div>
  )
}

HomeLayoutSectionTestimonials.propTypes = {}

export default HomeLayoutSectionTestimonials
