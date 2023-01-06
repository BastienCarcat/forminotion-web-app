import React, { useCallback, useMemo, useState } from 'react'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom'

const DetailsBlocksLink = () => {
  const [copied, setCopied] = useState(false)
  const { idForm } = useParams()

  const link = useMemo(() => {
    return `https://www.forminotion.com/form/${idForm}`
  }, [idForm])

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
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-6">
            <h2
              className="text-base font-medium text-gray-900"
              // className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl"
              id="form-link-copy"
            >
              Form link
            </h2>
            <div className="flex items-center gap-x-6 mt-4">
              <div className="flex-1">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                    disabled
                    value={link}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {copied ? (
                      <CheckIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClipboardIcon
                        onClick={handleCopy}
                        className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                key={0}
                type="button"
                onClick={handleOpenForm}
                className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600"
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

DetailsBlocksLink.propTypes = {}

export default DetailsBlocksLink
