import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'
import { colors } from './../../tools/constants'

const useStyles = makeStyles({
  home: {
    paddingTop: '64px',
    height: '300vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > h2': {
      fontWeight: '900',
      fontSize: '50px',
      color: colors.BLACK
    }
  }
})

const HomeScreen = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.home}>
      <Typography variant="h2">Home page !</Typography>
    </div>
  )
}

HomeScreen.propTypes = {}

export default HomeScreen
