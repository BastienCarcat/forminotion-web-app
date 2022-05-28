import { useAuth0 } from '@auth0/auth0-react'
import {
  AppBar,
  Slide,
  Toolbar,
  useScrollTrigger,
  Button as ButtonMat
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import LinkButton from '../../ui/Buttons/Link'
import { colors } from './../../../tools/constants'
import Button from './../../ui/Buttons/Button'

const useStyles = makeStyles({
  root: {
    width: '100%',
    zIndex: 900,
    '& .MuiAppBar-root': {
      backgroundColor: '#FFF',
      boxShadow: 'none',
      borderBottom: `1px solid ${colors.LIGHT_GRAY}`
    },
    '& .nav-bar': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      '& .logo': {
        flex: 1
      },
      '& .navigation': {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
      },
      '& .authentication': {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',

        '& .button': {
          margin: '0 15px'
        }
      }
    }
  }
})

const NavigationBar = (props) => {
  const classes = useStyles()
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
  const trigger = useScrollTrigger()
  return (
    <div className={classes.root}>
      <Slide in={!trigger}>
        <AppBar>
          <Toolbar>
            <div className="nav-bar">
              <div className="logo">
                <LinkButton to="/" title="Forminotion" />
              </div>
              <div className="navigation">
                <LinkButton to="form" title="Create form" />
              </div>

              <div className="authentication">
                {isAuthenticated ? (
                  <>
                    <ButtonMat
                      onClick={() =>
                        logout({
                          returnTo: window.location.origin
                        })
                      }
                      variant="text"
                    >
                      Logout
                    </ButtonMat>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={loginWithRedirect}
                      variant="text"
                      title="Login"
                    />
                    <Button
                      onClick={() =>
                        loginWithRedirect({
                          screen_hint: 'signup'
                        })
                      }
                      variant="outlined"
                      title="Try for free"
                    />
                  </>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Slide>
    </div>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
