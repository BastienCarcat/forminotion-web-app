import { Button, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Autocomplete, Switches, TextField } from 'mui-rff'
import React from 'react'
import { Form } from 'react-final-form'
import axios from 'axios'

const useStyles = makeStyles({
  form: {
    width: '50vw',
    '& .grid-container': {
      '& > .MuiGrid-item': {
        padding: '10px'
      },
      '& .switch': {
        display: 'flex',
        justifyContent: 'center'
      }
    }
  }
})

const MainForm = (props) => {
  const classes = useStyles()

  const onSubmit = (values) => {
    console.log(values)
    axios({
      method: 'POST',
      url: '/put',
      data: values
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ Tags: [] }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.form}>
            <Grid container className="grid-container">
              <Grid item xs={6}>
                <TextField name="Name" label="Name" />
              </Grid>
              <Grid item xs={6}>
                <TextField name="Number" label="Number" type="number" />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  label="Select"
                  name="Select"
                  options={['Select 1', 'Select 2']}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  label="Tags"
                  name="Tags"
                  options={['Tag 1', 'Tag 2']}
                  multiple
                />
              </Grid>
              <Grid item xs={12} className="switch">
                <Switches name="Bool" data={{ label: 'Bool' }} />
              </Grid>
              <Button variant="outlined" type="submit">
                Validate
              </Button>
            </Grid>
          </div>
        </form>
      )}
    />
  )
}

MainForm.propTypes = {}

export default MainForm
