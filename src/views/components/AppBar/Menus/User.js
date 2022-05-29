import { useAuth0 } from '@auth0/auth0-react'
import { Logout } from '@mui/icons-material'
import {
  ClickAwayListener,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFF',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px 0px rgb(0,0,0,0.3)',
    padding: '0 !important',
    '& .MuiMenuItem-root:first-child': {
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px'
    },
    '& .MuiMenuItem-root:last-child': {
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px'
    },
    '& .MuiMenuItem-root:hover': {
      backgroundColor: 'rgb(0,0,0,0.1)'
    },
    '& .MuiMenuItem-root+.MuiDivider-root': {
      margin: 0
    }
  }
})

const UserPopper = ({ onClickAway }) => {
  const classes = useStyles()

  const { logout } = useAuth0()

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div>
        <MenuList className={classes.root}>
          <MenuItem>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() =>
              logout({
                returnTo: window.location.origin
              })
            }
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>logout</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    </ClickAwayListener>
  )
}

UserPopper.propTypes = {
  onClickAway: PropTypes.func
}

export default UserPopper
