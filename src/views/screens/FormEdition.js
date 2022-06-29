import { withAuthenticationRequired } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import FormCreation from "../components/Edition/Creation/Form";

const useStyles = makeStyles({
    root: {
        paddingTop: '64px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const FormEditionScreen = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <FormCreation />
        </div>
    )
}

FormEditionScreen.propTypes = {}

export default withAuthenticationRequired(FormEditionScreen, {
    onRedirecting: () => <CircularProgress />
})
