import React from 'react'

export const DraggableTypes = Object.freeze({ FIELD: 'FIELD' })

const UserBlockSettingsProfileLayout = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>block</div>
      <div className="col-span-2">block</div>
    </div>
  )
}

UserBlockSettingsProfileLayout.propTypes = {}

export default UserBlockSettingsProfileLayout
