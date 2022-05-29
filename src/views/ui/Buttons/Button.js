import { Button as ButtonMat } from '@mui/material'
import { withStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { colors, colorsRgb } from '../../../tools/constants'

const ButtonText = withStyles({
  root: {
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    color: `${colors.BLACK} !important`,
    '&:hover': {
      backgroundColor: `transparent !important`,
      color: `rgb(${colorsRgb.BLACK}, 0.8) !important`
    }
  }
})(ButtonMat)

const ButtonContained = withStyles({
  root: {
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    color: `#fff !important`
  }
})(ButtonMat)

const ButtonOutlined = withStyles({
  root: {
    textTransform: 'none !important',
    fontWeight: '600 !important',
    fontSize: '16px !important'
    // color: `#fff !important`
  }
})(ButtonMat)

const Button = ({ title, classes, variant = 'text', children, ...others }) => {
  switch (variant) {
    case 'text':
      return (
        <ButtonText variant="text" {...others}>
          {children || title}
        </ButtonText>
      )
    case 'contained':
      return (
        <ButtonContained variant="contained" {...others}>
          {children || title}
        </ButtonContained>
      )
    case 'outlined':
      return (
        <ButtonOutlined variant="outlined" {...others}>
          {children || title}
        </ButtonOutlined>
      )
    default:
      break
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  typographyProps: PropTypes.object,
  classes: PropTypes.object,
  variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
  children: PropTypes.any
}

export default Button
