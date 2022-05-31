import { useAuth0 } from '@auth0/auth0-react'
import {
  AppBar,
  Avatar,
  Fade,
  Popper,
  Slide,
  Toolbar,
  useScrollTrigger
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import _ from 'lodash'
import React, { useState } from 'react'
import LinkButton from '../../ui/Buttons/Link'
import { colors } from './../../../tools/constants'
import Button from './../../ui/Buttons/Button'
import UserPopper from './Menus/User'

const useStyles = makeStyles({
  root: {
    width: '100%',
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

        '& .avatar': {
          marginRight: '8px',
          width: '30px',
          height: '30px'
        }
      }
    }
  },
  popper: {
    zIndex: 1200
  }
})

const NavigationBar = (props) => {
  const popperEntities = Object.freeze({ NONE: 0, USER: 1 })
  const [popperOpened, setPopperOpened] = useState(popperEntities.NONE)
  const [anchorEl, setAnchorEl] = useState(null)

  const classes = useStyles()

  const { loginWithRedirect, isAuthenticated, user } = useAuth0()
  const trigger = useScrollTrigger()

  const handleOpenPopper = (entity) => (event) => {
    setAnchorEl(event.currentTarget)
    setPopperOpened(_.get(popperEntities, entity))
  }

  const handleClosePopper = () => {
    setAnchorEl(null)
    setPopperOpened(popperEntities.NONE)
  }

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
                  <Button onClick={handleOpenPopper('USER')} variant="text">
                    <>
                      <Avatar
                        className="avatar"
                        sizes="6px"
                        src={_.get(user, 'picture')}
                      />
                      <div>{_.get(user, 'nickname')}</div>
                    </>
                  </Button>
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

      <Popper
        className={classes.popper}
        open={!trigger && popperOpened !== 0}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <div>
              {(() => {
                switch (popperOpened) {
                  case popperEntities.USER:
                    return <UserPopper closePopper={handleClosePopper} />

                  default:
                    return <div>default</div>
                }
              })()}
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

NavigationBar.propTypes = {}

export default NavigationBar
