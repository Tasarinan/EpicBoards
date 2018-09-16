import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Content from './Components/Content'
import Drawer from './Components/Drawer'
import Header from './Components/Header'
import Settings from './Components/Settings'
import Notification from './Components/Notification'

const styles = {
  root: {
    height: '100%',
  },
}

class App extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Header />
        <Drawer />
        <Content />
        <Notification />
        <Settings />
      </div>
    )
  }
}

export default withStyles(styles)(App)
