import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Home from './views/Home'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { config } from './config/index'
import _ from 'lodash'

const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const { auth0 } = config || {}

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={_.get(auth0, 'domain')}
      clientId={_.get(auth0, 'clientId')}
      audience={_.get(auth0, 'audience')}
      // redirectUri={window.location.origin}
      redirectUri="http://localhost:3000/form"
      scope="read:current_user update:current_user_metadata"
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="forminotion">
            <Home />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
)
