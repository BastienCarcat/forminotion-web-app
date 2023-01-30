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
        <div className="p-4 rounded-lg bg-white h-full overflow-hidden shadow">
          <div className="text-xl tracking-tight font-extrabold text-gray-900 sm:text-2xl">
            Actions
          </div>
          <div className="mt-4">
            <button
              disabled={_.get(form, 'notion.deleted')}
              type="button"
              onClick={() => setOpen(dialogs.DUPLICATE)}
              className="disabled:opacity-50 px-4 py-2 gap-x-2 flex justify-between items-center rounded-md hover:bg-gray-100 w-full"
            >
              <div className="truncate">Duplicate form</div>
              <DuplicateIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 bg-red-50 rounded-md border border-red-300">
            <button
              onClick={() => setOpen(dialogs.DELETE)}
              className="px-4 py-2 gap-x-2 flex justify-between items-center rounded-md hover:bg-red-100 w-full"
            >
              <div className="truncate text-red-500">Delete form</div>
              <TrashIcon className="w-4 h-4 text-red-500" />
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
