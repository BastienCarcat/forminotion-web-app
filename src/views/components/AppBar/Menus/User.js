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
import { useNavigate } from 'react-router-dom'

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

const UserPopper = ({ closePopper }) => {
  const classes = useStyles()

  const { logout } = useAuth0()
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    closePopper()
    navigate(path)
  }

  const handleLogout = () => {
    closePopper()
    logout({
      returnTo: window.location.origin
    })
  }

  return (
    <ClickAwayListener onClickAway={closePopper}>
      <div>
        <MenuList className={classes.root}>
          <MenuItem onClick={() => handleNavigate('/forms')}>
            <ListItemText>My forms</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
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
  closePopper: PropTypes.func
}

export default UserPopper
