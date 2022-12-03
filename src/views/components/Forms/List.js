import React, { useCallback, useEffect, useState } from 'react'
import FormCard from './Card'
import _ from 'lodash'
import Loader from '../../ui/Globals/Loader'
import { useNavigate } from 'react-router-dom'
import { useAxiosGet } from '../../../hooks/useAxiosGet'

const Forms = () => {
  const [forms, setForms] = useState([])
  const navigate = useNavigate()

  const [call, loading] = useAxiosGet()

  const getForms = useCallback(async () => {
    try {
      const data = await call('form/getAll')

      if (data) {
        setForms(data)
      }
    } catch (e) {
      console.error(e)
    }
  }, [call])

  useEffect(() => {
    getForms()
  }, [getForms])

  return (
    <>
      {loading ? (
        <Loader classes={{ root: 'mt-36' }} />
      ) : (
        <>
          {forms.length !== 0 ? (
            <ul
              role="list"
              className="mx-6 my-5 sm:mx-8 mt-3 flex flex-wrap justify-center"
            >
              {_.map(forms, (form, key) => (
                <FormCard form={form} key={key} />
              ))}
            </ul>
          ) : (
            <div className="text-center flex flex-col justify-center h-full">
              <svg
                className="mx-auto h-12 w-12 text-grayAppbar-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No forms
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new form.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/edition')}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  New Form
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

Forms.propTypes = {}

export default Forms
