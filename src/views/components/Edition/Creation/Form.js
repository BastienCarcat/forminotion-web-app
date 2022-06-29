import { Typography} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Button from "../../../ui/Buttons/Button";

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
    }
})

const FormCreation = () => {
const classes = useStyles()

    const handleAddToNotion = () => {
window.open('https://api.notion.com/v1/oauth/authorize?owner=user&client_id=9e763688-8c89-4028-8abc-4ee8dabf6a47&redirect_uri=https://bastiencarcat.github.io/forminotion-web-app/&response_type=code', '_blank', 'location=yes,height=800,width=600,scrollbars=yes,status=yes')
    }

    return (
        <div className={classes.root}>
            <div className="header">
                <Typography variant="h2">Create a form</Typography>
            </div>
            <Button title="Add to notion" onClick={handleAddToNotion} ></Button>
        </div>
    )
}
 FormCreation.propTypes = {}

export default FormCreation
