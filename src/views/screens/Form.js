import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import MainForm from '../components/Form/Form'

const useStyles = makeStyles({
  root: {
    paddingTop: '64px'
  }
})

const FormScreen = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MainForm />
    </div>
  )
}

FormScreen.propTypes = {}

export default withAuthenticationRequired(FormScreen, {
  onRedirecting: () => <CircularProgress />
})
