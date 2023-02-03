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
        <div className="flex w-full flex-col">
          <label
            htmlFor={name}
            className="block flex-auto text-sm font-medium text-gray-700"
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
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ',
                value ? 'bg-primary' : 'bg-gray-200'
              )}
            >
              <span
                aria-hidden="true"
                className={clsx(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
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
