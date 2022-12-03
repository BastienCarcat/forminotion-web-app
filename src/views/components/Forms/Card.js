import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

const FormCard = ({ form }) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    // window.open(`/form/${_.get(form, 'id')}`, '_blank')
    navigate(`/details/${_.get(form, 'id')}`)
  }

  return (
    <li className="col-span-1 flex shadow-sm rounded-md mx-6 my-8 w-64">
      <div className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <button
            onClick={handleClickCard}
            className="text-gray-900 font-medium hover:text-gray-600"
          >
            {_.get(form, 'title')}
          </button>
          <p className="text-gray-500">{_.get(form, 'description')}</p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button
            type="button"
            onClick={handleClickCard}
            className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 "
          >
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  )
}

FormCard.propTypes = {
  form: PropTypes.object
}

export default FormCard
