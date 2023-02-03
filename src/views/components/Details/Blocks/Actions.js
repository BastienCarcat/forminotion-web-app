import React, { useCallback, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { DuplicateIcon, TrashIcon } from '@heroicons/react/outline'
import DetailsBlocksActionsDeleteDialog from './Dialogs/Delete'
import DetailsBlocksActionsDuplicateDialog from './Dialogs/Duplicate'
import _ from 'lodash'

const DetailsBlocksActions = ({ form }) => {
  const [open, setOpen] = useState(null)
  const dialogs = Object.freeze({ DELETE: 1, DUPLICATE: 2 })

  const handleCloseDialog = useCallback(() => {
    setOpen(null)
  }, [])

  return (
    <>
      <section className="flex-auto">
        <div className="h-full overflow-hidden rounded-lg bg-white p-4 shadow">
          <div className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Actions
          </div>
          <div className="mt-4">
            <button
              disabled={_.get(form, 'notion.deleted')}
              type="button"
              onClick={() => setOpen(dialogs.DUPLICATE)}
              className="flex w-full items-center justify-between gap-x-2 rounded-md px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
            >
              <div className="truncate">Duplicate form</div>
              <DuplicateIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 rounded-md border border-red-300 bg-red-50">
            <button
              onClick={() => setOpen(dialogs.DELETE)}
              className="flex w-full items-center justify-between gap-x-2 rounded-md px-4 py-2 hover:bg-red-100"
            >
              <div className="truncate text-red-500">Delete form</div>
              <TrashIcon className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </section>

      <DetailsBlocksActionsDeleteDialog
        open={open === dialogs.DELETE}
        onClose={handleCloseDialog}
      />
      <DetailsBlocksActionsDuplicateDialog
        open={open === dialogs.DUPLICATE}
        onClose={handleCloseDialog}
        form={form}
      />
    </>
  )
}

DetailsBlocksActions.propTypes = {
  form: PropTypes.object
}

export default DetailsBlocksActions
