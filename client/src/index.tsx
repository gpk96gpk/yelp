import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"


// renders the app component to the root element in html
ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(<App />)
