import React, { useState, useMemo, useCallback } from 'react'
import _ from 'lodash'
import { Form } from 'react-final-form'
import PropTypes from 'prop-types'
import FieldFormEditionBlockForm from './Field'

const FormEditionBlockForm = ({ form }) => {
  // const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(_.get(form, 'fields', []))

  const initialValues = useMemo(() => {
    const defaultValues = {}
    _.each(fields, (field) => {
      const { idFieldNotion, property } = field
      switch (_.get(property, 'type')) {
        case 'multi_select':
          _.set(defaultValues, idFieldNotion, [])
          break
        case 'rich_text':
        case 'title':
          _.set(defaultValues, idFieldNotion, [{ text: { content: '' } }])
          break
        case 'checkbox':
          _.set(defaultValues, idFieldNotion, false)
          break
        case 'select':
        case 'status':
          _.set(defaultValues, idFieldNotion, {
            name: null,
            id: null,
            color: null
          })
          break
        case 'date':
          _.set(defaultValues, idFieldNotion, { start: null })
          break
        default:
          _.set(defaultValues, idFieldNotion, '')
          break
      }
    })
    return defaultValues
  }, [fields])

  const dragField = useCallback((dragIndex, hoverIndex) => {
    setFields((prevState) =>
      _.map(prevState, (x) => {
        if (_.get(x, 'order') === dragIndex) {
          return {
            ...x,
            order: hoverIndex
          }
        } else if (_.get(x, 'order') === hoverIndex) {
          return {
            ...x,
            order: dragIndex
          }
        }
        return x
      })
    )
  }, [])

  return (
    <section aria-labelledby="preview-form">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <Form
            onSubmit={() => {}}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <form
                className="space-y-8 divide-y divide-gray-200"
                onSubmit={handleSubmit}
              >
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
                    {_.chain(fields)
                      .orderBy('order')
                      .map((field) => (
                        <FieldFormEditionBlockForm
                          field={field}
                          key={_.get(field, 'id')}
                          dragField={dragField}
                          index={_.get(field, 'order')}
                        />
                      ))
                      .value()}
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
                    // disabled={loading}
                    type="submit"
                    className="relative mt-4 rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:opacity-80 disabled:bg-primary disabled:opacity-50"
                  >
                    {/*{loading && (*/}
                    {/*  <Loader*/}
                    {/*    className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-[inherit] bg-[inherit]"*/}
                    {/*    size={18}*/}
                    {/*  />*/}
                    {/*)}*/}
                    Save
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </section>
  )
}

FormEditionBlockForm.propTypes = {
  form: PropTypes.object
}

export default FormEditionBlockForm
