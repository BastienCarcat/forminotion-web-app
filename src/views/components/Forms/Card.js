import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { BookmarkIcon } from '@heroicons/react/outline'

const FormCard = ({ form }) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    // window.open(`/form/${_.get(form, 'id')}`, '_blank')
    navigate(`/details/${_.get(form, 'id')}`)
  }

  return (
    // className="flex-1 col-span-1 gap-x-2 shadow-sm flex justify-between items-center text-left px-4 py-2 text-sm border border-gray-200 rounded-md text-gray-900 font-medium hover:bg-gray-50 hover:text-gray-600"
    <div className="relative shadow-sm text-sm border border-gray-200 rounded-md text-gray-900 font-medium hover:bg-gray-50 hover:text-gray-600 h-10">
      <button
        onClick={handleClickCard}
        className="inset-0 absolute w-full text-left"
      >
        <span className="truncate ml-4">{_.get(form, 'title')}</span>
      </button>
      <button
        onClick={() => console.log('e')}
        className="absolute inset-y-0 right-0 mr-4"
      >
        <div className="h-5 w-5">
          <BookmarkIcon className="h-full" strokeWidth="1.5" />
        </div>
      </button>
    </div>
  )
}

FormCard.propTypes = {
  form: PropTypes.object
}

export default FormCard
