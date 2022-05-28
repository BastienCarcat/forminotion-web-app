import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { colors } from '../../../tools/constants'
import clsx from 'clsx'
import _ from 'lodash'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    '& .text': {
      fontWeight: 600,
      fontSize: '16px',
      color: colors.BLACK
    }
  }
})

const LinkButton = ({ to, title, typographyProps, classes, ...others }) => {
  const cls = useStyles()
  return (
    <Link
      className={clsx([cls.link], _.get(classes, 'link'))}
      to={to}
      {...others}
    >
      <Typography
        classes={{ root: clsx(['text'], _.get(classes, 'text')) }}
        component="span"
        {...typographyProps}
      >
        {title}
      </Typography>
    </Link>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  typographyProps: PropTypes.object,
  classes: PropTypes.object
}

export default LinkButton
