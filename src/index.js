import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Home from './views/Home'

const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div className="forminotion">
        <Home />
      </div>
    </ThemeProvider>
  </React.StrictMode>
)
