import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = makeStyles({
  authentication: {
    display: 'flex',
    flexDirection: 'column',
    '& > button': {
      margin: '10px 0'
    }
  }
})

const LogIn = (props) => {
  const { loginWithRedirect } = useAuth0()
  const classes = useStyles()

  return (
    <div className={classes.authentication}>
      <Button
        onClick={() =>
          loginWithRedirect({
            screen_hint: 'signup'
          })
        }
        variant="outlined"
      >
        Sign up
      </Button>
    </div>
  )
}

LogIn.propTypes = {}

export default LogIn
