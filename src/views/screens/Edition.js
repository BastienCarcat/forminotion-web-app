import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import Loader from '../ui/Globals/Loader'
import { useParams } from 'react-router-dom'
import FormEditionLayout from '../components/Edition/Layout'
import { ProviderBehaviourFormEdition } from '../components/Edition/Contexts/behaviour'

const FormEditionScreen = () => {
  const { idForm } = useParams()

  // const initialValues = useMemo(() => {
  //   const defaultValues = {
  //     fieldsValue: null
  //   }
  //   _.each(_.get(form, 'fields'), (field) => {
  //     const { idFieldNotion, property } = field
  //     switch (_.get(property, 'type')) {
  //       case 'multi_select':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, [])
  //         break
  //       case 'rich_text':
  //       case 'title':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, [
  //           { text: { content: '' } }
  //         ])
  //         break
  //       case 'checkbox':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, false)
  //         break
  //       case 'select':
  //       case 'status':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, {
  //           name: null,
  //           id: null,
  //           color: null
  //         })
  //         break
  //       case 'date':
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, { start: null })
  //         break
  //       default:
  //         _.set(defaultValues, `fieldsValue.${idFieldNotion}`, '')
  //         break
  //     }
  //   })
  //   return defaultValues
  // }, [form])

  return (
    <ProviderBehaviourFormEdition idForm={idForm}>
      <FormEditionLayout />
    </ProviderBehaviourFormEdition>
  )
}

FormEditionScreen.propTypes = {}

export default withAuthenticationRequired(FormEditionScreen, {
  onRedirecting: () => <Loader />
})
