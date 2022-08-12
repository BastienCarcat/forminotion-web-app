import React, { useEffect, useState } from 'react'
import FormCard from './Card'
import axios from 'axios'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import Loader from '../../ui/Globals/Loader'

const Forms = (props) => {
  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getForms()
  }, [])

  const getForms = async () => {
    try {
      setLoading(true)
      const data = await axios.get('form/getAll')

      setForms(_.get(data, 'data'))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateForm = () => {
    navigate('/edition')
  }

  return (
    <div>
      <div className="px-4 py-5 sm:px-6 flex justify-between w-full items-center">
        <h2 className="text-2xl font-bold">My forms</h2>
        <button
          onClick={handleCreateForm}
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create new form
        </button>
      </div>
      {loading ? (
        <Loader classes={{ root: 'mt-36' }} />
      ) : (
        <div>
          <ul
            role="list"
            className="mx-6 my-5 sm:mx-8 mt-3 flex flex-wrap justify-center"
          >
            {_.map([...forms, ...forms, ...forms], (form, key) => (
              <FormCard form={form} key={key} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

Forms.propTypes = {}

export default Forms
