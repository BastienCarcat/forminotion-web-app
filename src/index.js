import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Home from './views/Home'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-bsnqztah.us.auth0.com"
      clientId="mOnHPYAn9ElR6dZabe2EJAKIZ0pkNsWg"
      // redirectUri={window.location.origin}
      redirectUri={'http://localhost:3000/form'}
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
