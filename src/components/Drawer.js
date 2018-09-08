import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'

import { toggleDrawer, createEpic, selectEpic, deleteEpic } from '../actions/'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
})

class DrawerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.createEpic = this.createEpic.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    const { toggleDrawer } = this.props
    toggleDrawer(false)
  }

  createEpic() {
    const { createEpic } = this.props
    createEpic()
  }

  selectEpic(index) {
    const { selectEpic } = this.props
    selectEpic(index)
  }

  deleteEpic(index) {
    const { deleteEpic } = this.props
    deleteEpic(index)
  }

  render() {
    const {
      globalUi: { drawerOpen, selectedEpic },
      epics,
      classes,
    } = this.props

    return (
      <Drawer open={drawerOpen} onClose={this.onClose} className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Epics</ListSubheader>}
        >
          {epics &&
            epics.map((epic, index) => {
              const selected = index === selectedEpic
              return (
                <ListItem
                  button
                  selected={selected}
                  key={epic.id}
                  onClick={() => this.selectEpic(index)}
                >
                  <ListItemText primary={epic.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.deleteEpic(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}

          <ListItem button onClick={this.createEpic}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create Epic" />
          </ListItem>
        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Settings</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="My Settings" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

const mapDispatchToProps = {
  createEpic,
  deleteEpic,
  selectEpic,
  toggleDrawer,
}

const mapStateToProps = state => ({
  epics: state.epics,
  globalUi: state.globalUi,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DrawerComponent),
)
