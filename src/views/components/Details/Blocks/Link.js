import React, { useCallback, useMemo, useState } from 'react'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { config } from '../../../../config'
import _ from 'lodash'

const DetailsBlocksLink = ({ form }) => {
  const [copied, setCopied] = useState(false)
  const { idForm } = useParams()
  const { appUrl } = config || {}

  const link = useMemo(() => {
    return `${appUrl}form/${idForm}`
  }, [idForm, appUrl])

  const handleCopy = useCallback(async () => {
    await navigator?.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, [2000])
  }, [link])

  const handleOpenForm = useCallback(() => {
    window.open(link, '_blank')
  }, [link])

  return (
    <>
      <section aria-labelledby="form-link-copy">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h2
              className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl"
              id="form-link-copy"
            >
              Form link
            </h2>
            <div className="mt-4 flex items-center gap-x-6">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 pr-10 sm:text-sm"
                    disabled
                    value={link}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {copied ? (
                      <CheckIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClipboardIcon
                        onClick={handleCopy}
                        className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={
                  _.get(form, 'notion.deleted') ||
                  _.get(form, 'notion.archived')
                }
                type="button"
                onClick={handleOpenForm}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-primary-600 disabled:bg-primary disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="-ml-1 mr-2 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                <span>Open form</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

DetailsBlocksLink.propTypes = {
  form: PropTypes.object
}

export default DetailsBlocksLink
