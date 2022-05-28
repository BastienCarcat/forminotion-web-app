import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import Auth0ProviderWithHistory from './providers/Auth0ProviderWithHistory'
import App from './views/screens/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6726'
    }
  },
  typography: {
    fontFamily: 'DM Sans'
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        subtitle1: 'h6',
        subtitle2: 'h6',
        body1: 'p',
        body2: 'span'
      }
    }
  }
})

root.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <ThemeProvider theme={theme}>
          <div className="forminotion">
            <App />
          </div>
        </ThemeProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>
)
