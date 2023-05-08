import React from 'react'
import UserBlockSettingsProfileLayout from './Blcoks/User/User'

export const DraggableTypes = Object.freeze({ FIELD: 'FIELD' })

const SettingsProfileLayout = () => {
  return (
    <div>
      <UserBlockSettingsProfileLayout />
    </div>
  )
}

SettingsProfileLayout.propTypes = {}

export default SettingsProfileLayout
