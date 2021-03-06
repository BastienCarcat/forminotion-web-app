import { Button, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import cleanDeep from 'clean-deep'
import _ from 'lodash'
import { Debug } from 'mui-rff'
import React, { useEffect, useMemo, useState } from 'react'
import { Form } from 'react-final-form'
import MultiSelectField from './Fields/MultiSelect'
import NumberField from './Fields/Number'
import SelectField from './Fields/Select'
import SwitchField from './Fields/Switch'
import TextField from './Fields/Text'

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
    },
    '& .button-submit': {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px'
    }
  }
})

const MainForm = (props) => {
  const classes = useStyles()
  //TODO: put databaseInfo in a context
  const [databaseInfo, setDatabaseInfo] = useState(null)

  const initialValues = useMemo(() => {
    const init = {}
    _.chain(databaseInfo)
      .values()
      .map((field) => {
        if (_.get(field, 'type') === 'multi_select') {
          _.set(init, _.get(field, 'name'), [])
        }
        return init
      })
      .value()
    return init
  }, [databaseInfo])

  useEffect(() => {
    async function init() {
      const response = await retrieveDatabaseInfo()
      setDatabaseInfo(_.get(response, 'data.properties'))
    }
    init()
  }, [])

  useEffect(() => {
    console.log('databaseInfo', databaseInfo)
  }, [databaseInfo])

  const retrieveDatabaseInfo = async () => {
    // const data = await axios({
    //   method: 'GET',
    //   url: 'notion/getDbInformations'
    // })
    try {
      const data = await axios.get(
        'https://forminotion-back.herokuapp.com/api/notion/getDbInformations'
      )

      return data
    } catch (e) {
      console.error(e)
    }
  }
  const onSubmit = async (values) => {
    try {
      const fields = {}
      _.chain(databaseInfo)
        .forEach((field, name) => {
          switch (_.get(field, 'type')) {
            case 'title':
              if (values[name]) {
                _.set(fields, name, {
                  title: [{ text: { content: values[name] } }]
                })
              }
              break
            case 'rich_text':
              if (values[name]) {
                _.set(fields, name, {
                  rich_text: [{ text: { content: values[name] } }]
                })
              }
              break
            case 'number':
              if (values[name]) {
                _.set(fields, name, { number: _.toNumber(values[name]) })
              }
              break

            default:
              if (values[name]) {
                _.set(fields, `${name}.${_.get(field, 'type')}`, values[name])
              }
              break
          }
        })
        .value()
      await axios.post(
        'https://forminotion-back.herokuapp.com/api/notion/createDbItem',
        cleanDeep(fields)
      )
    } catch (e) {
      console.eroor(e)
    }

    // await axios({
    //   method: 'POST',
    //   url: 'notion/createDbItem',
    //   data: cleanDeep(fields)
    // })
  }

  if (!databaseInfo) return <div>No database loaded</div>

  //Do a global Comp const with both name and label in common and specify Comp as the field type
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.form}>
            <Grid container className="grid-container">
              {_.map(_.values(databaseInfo), (field, key) => (
                <>
                  <Grid item xs={12}>
                    {(() => {
                      switch (_.get(field, 'type')) {
                        case 'title':
                          return (
                            <TextField
                              name={_.get(field, 'name')}
                              label={_.get(field, 'name')}
                            />
                          )

                        case 'number':
                          return (
                            <NumberField
                              name={_.get(field, 'name')}
                              label={_.get(field, 'name')}
                            />
                          )

                        case 'checkbox':
                          return (
                            <div className="switch">
                              <SwitchField
                                name={_.get(field, 'name')}
                                label={_.get(field, 'name')}
                              />
                            </div>
                          )

                        case 'rich_text':
                          return (
                            <TextField
                              name={_.get(field, 'name')}
                              label={_.get(field, 'name')}
                            />
                          )

                        case 'select':
                          return (
                            <SelectField
                              name={_.get(field, 'name')}
                              label={_.get(field, 'name')}
                              options={_.get(field, 'select.options', [])}
                              getOptionLabel={(option) =>
                                _.get(option, 'name', '')
                              }
                            />
                          )

                        case 'multi_select':
                          return (
                            <MultiSelectField
                              name={_.get(field, 'name')}
                              label={_.get(field, 'name')}
                              options={_.get(field, 'multi_select.options', [])}
                              getOptionLabel={(option) =>
                                _.get(option, 'name', '')
                              }
                            />
                          )

                        default:
                          return <div>Field not found</div>
                      }
                    })()}
                  </Grid>
                </>
              ))}
            </Grid>
            <Debug />
            <div className="button-submit">
              <Button variant="outlined" type="submit">
                Validate
              </Button>
            </div>
          </div>
        </form>
      )}
    />
  )
}

MainForm.propTypes = {}

export default MainForm
