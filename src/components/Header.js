const { ipcRenderer } = require('electron')

import React from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SaveIcon from '@material-ui/icons/Save'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { toggleDrawer, saveEpics } from '../actions/'

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
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  saveButton: {
    marginRight: '-18px',
  },
  grey: {
    color: '#ccc',
  },
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.onClickMenuIcon = this.onClickMenuIcon.bind(this)
    this.save = this.save.bind(this)
    const scope = this

    ipcRenderer.on('save-epics', (event, data) => {
      scope.save()
    })
  }

  onClickMenuIcon() {
    const { toggleDrawer } = this.props
    toggleDrawer(true)
  }

  save() {
    const { saveEpics } = this.props
    saveEpics()
  }

  renderSave() {
    const { classes, globalUi, saveEpics } = this.props
    const { saving } = globalUi

    if (saving) {
      return (
        <CircularProgress className={classes.grey} size={20} thickness={4.8} />
      )
    } else {
      return (
        <IconButton
          aria-label="Save"
          onClick={this.save}
          className={classes.saveButton}
        >
          <SaveIcon className={classes.grey} />
        </IconButton>
      )
    }
  }

  render() {
    const { classes, toggleDrawer, globalUi, saveEpics } = this.props

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
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Epic Epics
            </Typography>
            {this.renderSave()}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleDrawer,
  saveEpics,
}

const mapStateToProps = state => ({
  globalUi: state.globalUi,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Header),
)
