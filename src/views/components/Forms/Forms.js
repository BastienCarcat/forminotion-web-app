import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import FormCard from './Card'
import axios from 'axios'
import _ from 'lodash'

const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
    display: 'flex',
    '& .card': {
      padding: '0 30px'
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

  useEffect(() => {
    console.log('forms', forms)
  }, [forms])

  return (
    <div className={classes.root}>
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
  )
}

Forms.propTypes = {}

export default Forms
