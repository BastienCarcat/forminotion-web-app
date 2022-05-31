import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Forms from '../components/Forms/Forms'

const useStyles = makeStyles({
  root: {
    paddingTop: '64px'
  }
})

const FormsListScreen = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Forms />
    </div>
  )
}

FormsListScreen.propTypes = {}

export default withAuthenticationRequired(FormsListScreen, {
  onRedirecting: () => <CircularProgress />
})
