import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { toggleDrawer } from '../actions/'

const styles = {
  root: {
    height: '48px',
    left: 0,
    position: 'fixed',
    right: 0,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  toolBar: {
    backgroundColor: 'rgba(63, 81, 181, 0.9)',
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.onClickMenuIcon = this.onClickMenuIcon.bind(this)
  }

  onClickMenuIcon() {
    const { toggleDrawer } = this.props
    toggleDrawer(true)
  }

  render() {
    const { classes, toggleDrawer } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense" className={classes.toolBar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.onClickMenuIcon}
            >
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
}

const mapDispatchToProps = {
  toggleDrawer,
}

export default withStyles(styles)(
  connect(
    () => {
      return {}
    },
    mapDispatchToProps,
  )(Header),
)
