import React, { useCallback, useEffect, useState } from 'react'
import FormCard from './Card'
import _ from 'lodash'
import Loader from '../../ui/Globals/Loader'
import { useNavigate } from 'react-router-dom'
import { useAxiosGet } from '../../../hooks/useAxiosGet'
import { useAxiosPost } from '../../../hooks/useAxiosPost'

const Forms = () => {
  const [forms, setForms] = useState([])
  const navigate = useNavigate()

  const [call, loading] = useAxiosGet()
  const [post] = useAxiosPost()

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

  const handlePinForm = useCallback(
    async (id, isPinned) => {
      await post('form/update', { id, isPinned })
      const updatedForms = _.map(forms, (form) => {
        if (_.get(form, 'id') === id) {
          return { ...form, isPinned }
        }
        return form
      })
      setForms(updatedForms || forms)
    },
    [post, setForms, forms]
  )

  return (
    <>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {forms.length !== 0 ? (
            <>
              {_.find(forms, (form) => _.get(form, 'isPinned')) && (
                <section className="mb-8 flex-auto">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-4 shadow">
                    <div className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                      Pinned forms
                    </div>
                    <div className="mt-4 px-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {_.chain(forms)
                          .filter((form) => _.get(form, 'isPinned'))
                          .map((form, key) => (
                            <FormCard
                              form={form}
                              key={key}
                              handlePinForm={handlePinForm}
                            />
                          ))
                          .value()}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <section className="flex-auto">
                <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-4 shadow">
                  <div className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                    All
                  </div>
                  <div className="mt-4 px-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {_.map(forms, (form, key) => (
                        <FormCard
                          form={form}
                          key={key}
                          handlePinForm={handlePinForm}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="flex h-full flex-col justify-center text-center">
              <svg
                className="text-grayAppbar-400 mx-auto h-12 w-12"
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
                  className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600"
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
