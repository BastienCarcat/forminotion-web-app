import React from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'
import clsx from 'clsx'
import { Switch } from '@headlessui/react'

const SwitchField = ({ label, name, ...others }) => {
  // const [enabled, setEnabled] = useState(false)
  return (
    <Field name={name} {...others}>
      {({ input: { onChange, value } }) => (
        <div className="w-full flex flex-col">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 flex-auto"
          >
            {label}
          </label>
          <div className="mt-1 flex flex-auto items-start justify-center">
            <Switch
              htmlFor={name}
              name={name}
              checked={!!value}
              onChange={(val) => {
                onChange(val)
              }}
              className={clsx(
                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                value ? 'bg-primary' : 'bg-gray-200'
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  value ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </Switch>
          </div>
        </div>
      )}
    </Field>
  )
}

SwitchField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default SwitchField
