import React, { Fragment, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import { DuplicateIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import _ from 'lodash'
import { useAxiosPost } from '../../../../../hooks/useAxiosPost'

const DetailsBlocksActionsDuplicateDialog = ({ onClose, open, form }) => {
  const { idForm } = useParams()

  const [post, loading] = useAxiosPost()

  // const navigate = useNavigate()

  const initialValues = useMemo(
    () => ({
      title: `${_.get(form, 'title')} (copy)`,
      description: _.get(form, 'description')
    }),
    [form]
  )

  const handleDuplicate = useCallback(
    async (values) => {
      try {
        console.log('values', values)
        const data = await post('form/duplicate', { idForm, ...values })
        console.log('data', data)
        onClose()
      } catch (e) {
        console.error(e)
        throw new Error(e)
      }
    },
    [idForm, post, onClose]
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <Form
          onSubmit={handleDuplicate}
          // validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                        <DuplicateIcon
                          className="h-6 w-6 text-orange-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900 sm:text-left text-center"
                        >
                          Duplicate form
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            The new form will have the same field configuration
                            as the duplicated one.
                          </p>
                          <div className="mt-4">
                            <Field name="title">
                              {({ input }) => (
                                <div>
                                  <label
                                    htmlFor="Form title"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Form title
                                  </label>
                                  <div className="mt-1">
                                    <input
                                      type="text"
                                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                      {...input}
                                    />
                                  </div>
                                </div>
                              )}
                            </Field>
                          </div>
                          <div className="mt-2">
                            <Field name="description">
                              {({ input }) => (
                                <div>
                                  <label
                                    htmlFor="Description"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Description
                                  </label>
                                  <div className="mt-1">
                                    <textarea
                                      rows={2}
                                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                      {...input}
                                    />
                                  </div>
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 sm:flex sm:flex-row-reverse">
                      <button
                        disabled={loading}
                        type="submit"
                        className="disabled:bg-primary disabled:opacity-50 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-600 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Duplicate
                      </button>
                      <button
                        disabled={loading}
                        type="button"
                        className="disabled:opacity-50 disabled:bg-white mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </form>
          )}
        />
      </Dialog>
    </Transition.Root>
  )
}

DetailsBlocksActionsDuplicateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  form: PropTypes.object
}

export default DetailsBlocksActionsDuplicateDialog
