import PropTypes from 'prop-types'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useAxiosGet } from '../../../../hooks/useAxiosGet'
import { useAxiosPost } from '../../../../hooks/useAxiosPost'
import deepmerge from 'deepmerge'
import _ from 'lodash'
import numeral from 'numeral'

const ContextBehaviourFormEdition = createContext(null)

const ProviderBehaviourFormEdition = ({ idForm, children }) => {
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)

  const [get, loadingGet] = useAxiosGet()
  const [post, loadingPost] = useAxiosPost()

  useEffect(() => {
    if (loadingPost || loadingGet) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [loadingPost, loadingGet])

  const getFormById = useCallback(async () => {
    const form = await get('form/getById', {
      params: { id: idForm }
    })
    setForm(form)
  }, [get, idForm])

  useEffect(() => {
    if (idForm) {
      getFormById()
    }
  }, [idForm])

  const updateForm = useCallback(
    async (values) => {
      if (values) {
        const response = await post('form/update', {
          id: idForm,
          ...values
        })
        setForm((form) => {
          return {
            ...form,
            form: deepmerge(_.get(form, 'form'), response)
          }
        })
      }
    },
    [idForm, post]
  )

  const updateFields = useCallback(
    async (values) => {
      if (values) {
        const response = await post('field/update', {
          fields: _.map(values, (x, index) => ({
            ...x,
            order: numeral(index).add(1).value()
          }))
        })
        setForm((form) => {
          return {
            ...form,
            fields: [
              ..._.chain(form)
                .get('fields')
                .filter(
                  (x) => !_.includes(_.map(response, 'id'), _.get(x, 'id'))
                )
                .value(),
              ...response
            ]
          }
        })
      }
    },
    [post]
  )

  const updateFormAndFields = useCallback(
    async (values) => {
      await Promise.all([
        updateForm(_.get(values, 'form')),
        updateFields(_.get(values, 'fields'))
      ])
    },
    [updateForm, updateFields]
  )

  const context = useMemo(
    () => ({
      form,
      idForm,
      loading,
      updateForm,
      updateFields,
      updateFormAndFields
    }),
    [form, idForm, loading, updateForm, updateFields, updateFormAndFields]
  )

  return (
    <ContextBehaviourFormEdition.Provider value={context}>
      {children}
    </ContextBehaviourFormEdition.Provider>
  )
}

const useContextFormEdition = () => {
  const context = useContext(ContextBehaviourFormEdition)

  if (context === undefined) {
    throw new Error(
      'useContextFormEdition must be used within a ContextBehaviourFormEdition'
    )
  }

  return context
}

export { ProviderBehaviourFormEdition, useContextFormEdition }

ProviderBehaviourFormEdition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  idForm: PropTypes.string
}
