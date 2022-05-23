import { useAuth0 } from '@auth0/auth0-react'
import { AppBar, Button, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& .nav-bar': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      '& .button': {
        margin: '0 15px'
      }
    }
  }
})

const useStylesAppBar = makeStyles({
  root: {
    boxShadow: 'none'
  }
})

const NavigationBar = (props) => {
  const classes = useStyles()
  const classesMat = useStylesAppBar()
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  return (
    <div className={classes.root}>
      <AppBar
        color="transparent"
        position="static"
        classes={{ root: classesMat.root }}
      >
        <Toolbar>
          <div className="nav-bar">
            <Link to="/">Forminotion</Link>
            <div>
              {isAuthenticated ? (
                <>
                  <Link className="button" to="form">
                    Create form
                  </Link>
                  <Button
                    className="button"
                    onClick={() =>
                      logout({
                        returnTo: window.location.origin
                      })
                    }
                    variant="outlined"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="button"
                    onClick={loginWithRedirect}
                    variant="outlined"
                  >
                    Login
                  </Button>
                  <Button
                    className="button"
                    onClick={() =>
                      loginWithRedirect({
                        screen_hint: 'signup'
                      })
                    }
                    variant="outlined"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
