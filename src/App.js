import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Content from './Components/Content'
import Drawer from './Components/Drawer'
import Header from './Components/Header'
import Settings from './Components/Settings'

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
        <Settings />
      </div>
    )
  }
}

export default withStyles(styles)(App)
