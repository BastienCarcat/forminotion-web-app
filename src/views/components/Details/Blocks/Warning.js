import React from 'react'
import { ExclamationIcon } from '@heroicons/react/solid'
import _ from 'lodash'
import PropTypes from 'prop-types'

const WarningBlocksNotionInfo = ({ form }) => {
  return (
    <div className="rounded-md shadow bg-red-100 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {`Notion database ${
              _.get(form, 'notion.archived') ? 'archived' : 'deleted'
            }`}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            {_.get(form, 'notion.archived') ? (
              <p>
                The Notion database linked to this form has been archived. You
                can no longer use this form. To use it again, please restore it
                in Notion. (
                <a
                  href={_.get(form, 'notion.url')}
                  className="underline font-bold text-red-800 mr-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Click here
                </a>
                or go to trash and select your database. Then click
                &quot;Restore page&quot; button).
              </p>
            ) : (
              <p>
                The Notion database linked to this form has been deleted. You
                can no longer use this form.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

WarningBlocksNotionInfo.propTypes = {
  form: PropTypes.object
}

export default WarningBlocksNotionInfo
