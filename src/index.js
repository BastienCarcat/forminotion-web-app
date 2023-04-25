import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import Auth0ProviderWithHistory from './providers/Auth0ProviderWithHistory'
import App from './views/screens/App'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <Auth0ProviderWithHistory>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Auth0ProviderWithHistory>
  </Router>
)
