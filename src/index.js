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
    mode: 'dark'
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
