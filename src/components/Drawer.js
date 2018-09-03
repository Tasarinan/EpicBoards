import React from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import StarIcon from '@material-ui/icons/Star'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'

import { toggleDrawer, createEpic, selectEpic } from '../actions/'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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

  selectEpic(e, index) {
    const { selectEpic } = this.props
    selectEpic(index)
  }

  render() {
    const {
      globalUi: { drawerOpen, selectedEpic },
      epics,
    } = this.props

    return (
      <Drawer open={drawerOpen} onClose={this.onClose}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Epics</ListSubheader>}
        >
          {epics &&
            epics.map((epic, index) => {
              return (
                <ListItem
                  button
                  key={epic.id}
                  onClick={e => this.selectEpic(e, index)}
                >
                  {
                    (index === selectedEpic) && <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                  }
                  <ListItemText inset primary={epic.id} />
                </ListItem>
              )
            })}

          <ListItem button onClick={this.createEpic}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText inset primary="Create Epic" />
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
            <ListItemText inset primary="My Settings" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleDrawer: payload => {
    dispatch(toggleDrawer(payload))
  },
  createEpic: payload => {
    dispatch(createEpic(payload))
  },
  selectEpic: payload => {
    dispatch(selectEpic(payload))
  },
})

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
