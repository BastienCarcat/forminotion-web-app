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

const AuthenticationButton = (props) => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
  const classes = useStyles()

  return (
    <div className={classes.authentication}>
      {isAuthenticated ? (
        <Button
          onClick={() =>
            logout({
              returnTo: window.location.origin
            })
          }
          variant="outlined"
        >
          Logout
        </Button>
      ) : (
        <Button onClick={loginWithRedirect} variant="outlined">
          Login
        </Button>
      )}
    </div>
  )
}

AuthenticationButton.propTypes = {}

export default AuthenticationButton
