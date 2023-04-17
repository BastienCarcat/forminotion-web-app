import React from 'react'
import { ProviderBehaviourForm } from '../components/Form/Contexts/behaviour'
import FormLayout from '../components/Form/Layout'

const FormScreen = () => {
  return (
    <ProviderBehaviourForm>
      <div className="h-full w-full bg-white">
        <FormLayout />
      </div>
    </ProviderBehaviourForm>
  )
}

FormScreen.propTypes = {}

export default FormScreen
0
