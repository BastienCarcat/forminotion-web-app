import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import Auth0ProviderWithHistory from './providers/Auth0ProviderWithHistory'
import App from './views/screens/App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
