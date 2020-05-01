import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(
  <App skipArrows skipBackspace skipEnter skipSpace skipModifiers />,
  document.getElementById('root'),
)
