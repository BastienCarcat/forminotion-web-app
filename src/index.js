import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import Auth0ProviderWithHistory from './providers/Auth0ProviderWithHistory'
import App from './views/screens/App'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { fetcher } from './config/index'
// import { SWRConfig } from 'swr/_internal'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        {/*<SWRConfig*/}
        {/*  value={{*/}
        {/*    fetcher*/}
        {/*  }}*/}
        {/*>*/}
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
        {/*</SWRConfig>*/}
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>
)
