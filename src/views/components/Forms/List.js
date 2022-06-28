import {CircularProgress, Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import FormCard from './Card'
import axios from 'axios'
import _ from 'lodash'
import Button from '../../ui/Buttons/Button'

const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    width: '1200px',
    '& .header': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '20px',
      alignItems: 'center'
    },
    '& .list': {
      display: 'flex',
      justifyContent: 'center',
      '& .card': {
        padding: '0 30px'
      }
    }
  }
})

const Forms = (props) => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState([])

  useEffect(() => {
    getForms()
  }, [])

  const getForms = async () => {
    try {
      setLoading(true)
      const data = await axios.get('form/getByUser')

      setForms(_.get(data, 'data'))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   console.log('forms', forms)
  // }, [forms])

  return (
    <div className={classes.root}>
      <div className="header">
        <Typography variant="h2">My forms</Typography>
        <div>
          <Button title="Create new form" variant="contained" />
        </div>
      </div>
      <div className="list">
        {loading ? (
          <CircularProgress />
        ) : (
          _.map(forms, (form) => (
            <div className="card">
              <FormCard form={form} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

Forms.propTypes = {}

export default Forms
