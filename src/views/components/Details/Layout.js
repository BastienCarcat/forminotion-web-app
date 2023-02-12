import React from 'react'
import DetailsBlocksLink from './Blocks/Link'
import DetailsBlocksGuide from './Blocks/Guide'
import DetailsBlocksNotionInfo from './Blocks/NotionInfo'
import PropTypes from 'prop-types'
import DetailsBlocksActions from './Blocks/Actions'
import WarningBlocksNotionInfo from './Blocks/Warning'
import _ from 'lodash'

const DetailsLayout = ({ form }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      {(_.get(form, 'notion.deleted') || _.get(form, 'notion.archived')) && (
        <div className="lg:col-span-3">
          <WarningBlocksNotionInfo form={form} />
        </div>
      )}

      <div className="lg:col-span-3">
        <DetailsBlocksLink form={form} />
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
