import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ArrowRightIcon } from '@heroicons/react/outline'

const DetailsBlocksNotionInfo = ({ form }) => {
  const handleOpenNotionDatabase = useCallback(() => {
    if (_.get(form, 'notion.url')) {
      window.open(_.get(form, 'notion.url'), '_blank')
    }
  }, [form])

  return (
    <section className="flex-auto">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-4 shadow">
        <div className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
          Notion database
        </div>
        <div className="mt-4">
          {_.get(form, 'notion.deleted') ? (
            <div className="text-center text-gray-500">
              Notion database deleted
            </div>
          ) : (
            <button
              onClick={handleOpenNotionDatabase}
              className="flex w-full items-center justify-between gap-x-2 rounded-md px-4 py-2 hover:bg-gray-100"
            >
              <div className="truncate">
                {_.get(form, 'notion.icon.emoji') && (
                  <span className="pr-2">
                    {_.get(form, 'notion.icon.emoji')}
                  </span>
                )}
                <span>{_.get(form, 'notion.title[0].plain_text')}</span>
              </div>
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        {/*  <div className="text-xl mt-2 tracking-tight font-extrabold text-gray-900 sm:text-2xl">
          Stats
        </div>
        <div className="flex-1 flex justify-center items-center">
          Coming soon
        </div>*/}
      </div>
    </section>
  )
}

DetailsBlocksNotionInfo.propTypes = {
  form: PropTypes.object
}

export default DetailsBlocksNotionInfo
