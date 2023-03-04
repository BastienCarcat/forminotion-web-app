import React from 'react'
import _ from 'lodash'
import FieldFormEditionBlockForm from './Field'
import { useContextFormEdition } from '../../Contexts/behaviour'
import { FieldArray } from 'react-final-form-arrays'

const FormEditionBlockForm = () => {
  const { form } = useContextFormEdition()

  return (
    <section aria-labelledby="preview-form">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="space-y-8 divide-y divide-gray-200 p-6">
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {_.get(form, 'form.title')}
              </h3>
              {_.get(form, 'form.description') && (
                <p className="mt-1 text-sm text-gray-500">
                  {_.get(form, 'form.description')}
                </p>
              )}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-3.5 gap-x-1.5 sm:grid-cols-6">
              <FieldArray name="fields">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <FieldFormEditionBlockForm
                      name={name}
                      field={_.get(fields, `value[${index}]`)}
                      fields={fields}
                      key={_.get(fields, `value[${index}].id`)}
                      index={index}
                    />
                  ))
                }
              </FieldArray>
            </div>
          </div>

          <div className="flex justify-between">
            <a
              href="/"
              target="_blank"
              className="pt-1 text-xs text-gray-400 hover:underline"
            >
              Powered by Forminotion
            </a>
            <button
              type="button"
              className="relative mt-4 rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80 disabled:bg-primary disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

FormEditionBlockForm.propTypes = {}

export default FormEditionBlockForm
