import React from 'react'
import Loader from '../../../../../ui/Globals/Loader'

const FooterBlocksFormBlocksFormLayout = () => {
  const loading = false
  return (
    <div className="flex justify-between">
      <a
        href="/"
        target="_blank"
        className="pt-1 text-xs text-gray-400 hover:underline"
      >
        Powered by Forminotion
      </a>
      <button
        disabled={loading}
        type="submit"
        className="relative mt-4 rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80 disabled:bg-primary disabled:opacity-50"
      >
        {loading && (
          <Loader
            className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-[inherit] bg-[inherit]"
            size={18}
          />
        )}
        Save
      </button>
    </div>
  )
}

FooterBlocksFormBlocksFormLayout.propTypes = {}

export default FooterBlocksFormBlocksFormLayout
