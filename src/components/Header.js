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

class DenseAppBar extends React.Component {
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
          <Toolbar variant="dense">
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

const mapDispatchToProps = dispatch => ({
  toggleDrawer: payload => {
    dispatch(toggleDrawer(payload))
  },
})

const mapStateToProps = state => ({
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DenseAppBar),
)
