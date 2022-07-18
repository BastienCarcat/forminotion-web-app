import React, { useState } from 'react'
import { Field } from 'react-final-form'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { Listbox } from '@headlessui/react'

const MultiSelectField = ({
  label,
  name,
  options,
  getOptionLabel,
  ...others
}) => {
  const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' }
  ]
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

  return (
    <Field name={name} {...others}>
      {({ input }) => (
        <Listbox
          /*value={selectedPeople}
          onChange={setSelectedPeople}*/
          multiple
          {...input}
        >
          <Listbox.Button>
            {selectedPeople.map(person => person.name).join(', ')}
          </Listbox.Button>
          <Listbox.Options>
            {people.map(person => (
              <Listbox.Option key={person.id} value={person}>
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      )}
    </Field>
  )
}

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func.isRequired
}

export default MultiSelectField
