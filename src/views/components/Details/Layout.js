import React from 'react'
import DetailsBlocksLink from './Blocks/Link'
import DetailsBlocksGuide from './Blocks/Guide'
import DetailsBlocksNotionInfo from './Blocks/NotionInfo'
import PropTypes from 'prop-types'
import DetailsBlocksActions from './Blocks/Actions'

const DetailsLayout = ({ form }) => {
  return (
    <div className="gap-4 lg:gap-8 grid grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-3">
        <DetailsBlocksLink />
      </div>

      <div className="lg:col-span-2">
        <DetailsBlocksGuide />
      </div>
      <div className="flex flex-col gap-4 lg:gap-8">
        <DetailsBlocksNotionInfo form={form} />
        <DetailsBlocksActions form={form} />
      </div>

      {/*<div className="lg:col-span-3">*/}
      {/*  <Example />*/}
      {/*</div>*/}
    </div>
  )
}

DetailsLayout.propTypes = {
  form: PropTypes.object
}

export default DetailsLayout
