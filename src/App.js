import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Content from './components/Content'
import Drawer from './components/Drawer'
import Header from './components/Header'
import Settings from './components/Settings'
import Notification from './components/Notification'

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
