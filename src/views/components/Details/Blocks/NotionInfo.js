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
      <div className="p-4 rounded-lg bg-white h-full overflow-hidden shadow flex flex-col">
        <div className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl">
          Notion database
        </div>

        <div className="mt-4">
          <button
            onClick={handleOpenNotionDatabase}
            className="px-4 py-2 gap-x-2 flex justify-between items-center rounded-md hover:bg-gray-100 w-full"
          >
            <div className="truncate">
              <span className="pr-2">{_.get(form, 'notion.icon.emoji')}</span>
              <span>{_.get(form, 'notion.title[0].plain_text')}</span>
            </div>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
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
