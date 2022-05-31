import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { colors } from '../../../tools/constants'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

const useStyles = makeStyles({
  card: {
    width: '250px',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

const FormCard = ({ form }) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea sx={{ flex: 1 }}>
          <CardContent sx={{ padding: '0 0 0 10px' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: '600', color: colors.BLACK }}
            >
              {_.get(form, 'title')}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.LIGHT_GRAY }}>
              {_.get(form, 'description', 'test')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

FormCard.propTypes = {
  form: PropTypes.object
}

export default FormCard
