import React, { useState, Fragment, useEffect } from 'react'
import FormCreationStepper from './Blocks/Stepper'
import _ from 'lodash'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import FormCreationStepForm from './Blocks/Steps/Form'

export const stepPositions = Object.freeze({
  FORM: 1,
  FIELDS: 2,
  PREVIEW: 3
})

const FormCreationLayout = props => {
  const [currentPosition, setCurrentPosition] = useState(stepPositions.FORM)
  const [steps, setSteps] = useState([
    { position: stepPositions.FORM, name: 'Form', status: 'CURRENT' },
    { position: stepPositions.FIELDS, name: 'Fields', status: 'UPCOMING' },
    { position: stepPositions.PREVIEW, name: 'Preview', status: 'UPCOMING' }
  ])

  // eslint-disable-next-line no-unused-vars
  const handleChangeStepStatus = (position, status) => {
    const clone = _.cloneDeep(steps)
    const index = _.findIndex(clone, x => _.get(x, 'position') === position)
    _.set(clone, `[${index}].status`, status)
    setSteps(clone)
  }
  // const people = [
  //   { id: 1, name: 'Durward Reynolds' },
  //   { id: 2, name: 'Kenton Towne' },
  //   { id: 3, name: 'Therese Wunsch' },
  //   { id: 4, name: 'Benedict Kessler' },
  //   { id: 5, name: 'Katelyn Rohan' }
  // ]
  // const [selectedPeople, setSelectedPeople] = useState([people[0], people[2]])

  // const handleSetSelected = person => {
  //   console.log('value', person)
  //   setSelectedPeople(person)
  // }

  useEffect(() => {
    console.log('currentPosition', currentPosition)
  }, [currentPosition])
  return (
    <div>
      <FormCreationStepper
        steps={steps}
        setCurrentPosition={setCurrentPosition}
      />
      <FormCreationStepForm />
      {/*<div className="fixed top-16 w-72">
        <Listbox
          value={selectedPeople}
          onChange={value => handleSetSelected(value)}
          multiple
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selectedPeople.map(person => person.name).join(', ')}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selectedPeople.includes(person)
                              ? 'font-medium'
                              : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selectedPeople.includes(person) ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>*/}
    </div>
  )
}

FormCreationLayout.propTypes = {}

export default FormCreationLayout
