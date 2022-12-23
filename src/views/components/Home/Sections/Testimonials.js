import React, { useCallback, useMemo, useState } from 'react'
import _ from 'lodash'
import Avatar1 from '../../../../Images/avatar-1.jpg'
import Avatar2 from '../../../../Images/avatar-2.jpeg'
import Avatar3 from '../../../../Images/avatar-3.jpeg'

const HomeLayoutSectionTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1)

  const testimonials = useMemo(
    () => [
      {
        comments:
          'I have integrated Forminotion on my website and thanks to that I can collect customer feedback directly in my database. What an incredible tool!',
        picture: Avatar3,
        name: 'Alexander Bostock',
        job: 'Web consultant',
        index: 1
      },
      {
        comments:
          'I found it very easy to use, I created my form in less than 5 minutes. It has become an indispensable tool for my dashboards ',
        picture: Avatar2,
        name: 'Anais Harrington',
        job: 'Designer',
        index: 2
      },
      {
        comments: 'A very good way to integrate forms directly into Notion!',
        picture: Avatar1,
        name: 'Nicolas Molina',
        job: 'Copywriter',
        index: 3
      }
    ],
    []
  )

  const currentTestimonial = useMemo(() => {
    return _.find(testimonials, (x) =>
      _.isEqual(_.get(x, 'index'), currentIndex)
    )
  }, [currentIndex, testimonials])

  const goPrev = useCallback(() => {
    setCurrentIndex(
      currentIndex === 1 ? _.size(testimonials) : currentIndex - 1
    )
  }, [setCurrentIndex, currentIndex, testimonials])

  const goNext = useCallback(() => {
    setCurrentIndex(
      currentIndex === _.size(testimonials) ? 1 : currentIndex + 1
    )
  }, [setCurrentIndex, currentIndex, testimonials])

  return (
    <div className="max-w-7xl mx-auto md:px-6 lg:px-8 ">
      <div className="py-12 px-4 sm:px-6 md:py-16 flex flex-row items-center justify-between gap-x-12 sm:gap-x-16">
        <div className="w-10 cursor-pointer" onClick={goPrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="md:flex md:flex-col max-w-4xl w-full">
          <div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow min-h-[150px]">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-4 h-10 w-10 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-3xl">
                  {_.get(currentTestimonial, 'comments')}
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-center justify-end">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={`${_.get(currentTestimonial, 'picture')}`}
                      alt=""
                    />
                  </div>
                  <div className="ml-4 text-xl">
                    <div className="font-medium text-white">
                      {' '}
                      {_.get(currentTestimonial, 'name')}
                    </div>
                    <div className="font-medium text-secondary">
                      {_.get(currentTestimonial, 'job')}
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="w-10 cursor-pointer" onClick={goNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

HomeLayoutSectionTestimonials.propTypes = {}

export default HomeLayoutSectionTestimonials
