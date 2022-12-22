import React, { useCallback } from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

const FormCard = ({ form, handlePinForm }) => {
  const navigate = useNavigate()

  const handleClickCard = useCallback(() => {
    navigate(`/details/${_.get(form, 'id')}`)
  }, [navigate, form])

  return (
    <div className="relative shadow-sm text-sm border border-gray-200 rounded-md text-gray-900 font-medium hover:bg-gray-50 hover:text-gray-600 h-10">
      <button
        onClick={handleClickCard}
        className="inset-0 absolute w-full text-left"
      >
        <span className="truncate ml-4">{_.get(form, 'title')}</span>
      </button>
      <button
        onClick={() =>
          handlePinForm(_.get(form, 'id'), !_.get(form, 'isPinned'))
        }
        className="absolute inset-y-0 right-0 mr-4"
      >
        {_.get(form, 'isPinned') ? (
          <div className="hover:text-primary-600 text-primary h-5 w-5">
            {/*<BookmarkIconSolid className="h-full" strokeWidth="1.5" />*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-full"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="hover:text-gray-900 h-5 w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>

            {/*<BookmarkIconOutline className="h-full" strokeWidth="1.5" />*/}
          </div>
        )}
      </button>
    </div>
  )
}

FormCard.propTypes = {
  form: PropTypes.object,
  handlePinForm: PropTypes.func
}

export default FormCard
