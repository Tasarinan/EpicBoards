import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    position: 'fixed',
    right: 0,
    left: 0,
    height: '48px',
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
}

function DenseAppBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Epic Epics
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(DenseAppBar)
