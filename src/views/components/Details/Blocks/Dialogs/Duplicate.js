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
      title: `${_.get(form, 'form.title')} (copy)`,
      description: _.get(form, 'form.description')
    }),
    [form]
  )

  const handleDuplicate = useCallback(
    async (values) => {
      try {
        await post('form/duplicate', { idForm, ...values })
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
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <Form
          onSubmit={handleDuplicate}
          // validate={validate}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
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
                  <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                        <DuplicateIcon
                          className="h-6 w-6 text-orange-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-4">
                        <Dialog.Title
                          as="h3"
                          className="text-center text-lg font-medium leading-6 text-gray-900 sm:text-left"
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
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-600 disabled:bg-primary disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Duplicate
                      </button>
                      <button
                        disabled={loading}
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:bg-white disabled:opacity-50 sm:mt-0 sm:w-auto sm:text-sm"
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
