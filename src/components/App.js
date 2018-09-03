import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Header from './Header'
import Content from './Content'

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
        <Content />
      </div>
    )
  }
}

export default withStyles(styles)(App)
