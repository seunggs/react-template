import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const App = ({children, location}) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>{children}</div>
    </MuiThemeProvider>
  )
}

export default App
