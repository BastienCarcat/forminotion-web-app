import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import React from 'react'
import MainForm from '../components/Form/Form'

const FormScreen = (props) => {
  return <MainForm />
}

FormScreen.propTypes = {}

export default withAuthenticationRequired(FormScreen, {
  onRedirecting: () => <CircularProgress />
})
