import React from 'react'
import ReactDOM from 'react-dom/client'
import Page from './page'  // <--- 关键看这里！必须是 './page'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)