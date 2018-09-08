import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    height: 'calc(100% - 48px)',
    backgroundColor: '#ccc',
    left: 0,
    marginTop: '48px',
    position: 'fixed',
    right: 0,
  },
  centerContainer: {
    gridColumnEnd: 3,
    gridColumnStart: 2,
    gridRowEnd: 2,
    gridRowStart: 3,
    textAlign: 'center',
    display: 'grid',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  header: {
    gridRowEnd: 2,
    gridRowStart: 3,
  }
}

const UnselectedEpic = props => {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.centerContainer}>
        <h1 className={classes.header}>Select or Create an Epic</h1>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(UnselectedEpic)
