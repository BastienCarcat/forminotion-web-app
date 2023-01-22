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
        <div className="h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {forms.length !== 0 ? (
            <>
              {_.find(forms, (form) => _.get(form, 'isPinned')) && (
                <section className="flex-auto mb-8">
                  <div className="p-4 rounded-lg bg-white h-full overflow-hidden shadow flex flex-col">
                    <div className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl">
                      Pinned forms
                    </div>
                    <div className="mt-4 px-4">
                      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
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
                <div className="p-4 rounded-lg bg-white h-full overflow-hidden shadow flex flex-col">
                  <div className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl">
                    All
                  </div>
                  <div className="mt-4 px-4">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
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
