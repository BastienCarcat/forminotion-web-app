import React from 'react'

const FormCreationStepForm = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-xl mx-auto">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Notion Workspace
        </label>
        <select
          id="workspace"
          name="workspace"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          defaultValue="Bastien"
        >
          <option>Bastien</option>
        </select>
      </div>
    </div>
  )
}
FormCreationStepForm.propTypes = {}

export default FormCreationStepForm
