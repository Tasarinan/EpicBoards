import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Input from '@material-ui/core/Input'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'

import { toggleSettings, startSaveLocationFlow } from '../../actions'

const styles = {
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: '200px auto',
    width: '600px',
    '&:focus': {
      outline: 'none',
    }
  },
  title: {
    margin: '16px auto',
  },
  settingsRow: {
    display: 'flex',
    width: '100%',
    padding: '8px',
  },
  buttons: {
    flexShrink: 1,
    margin: '0 6px',
  },
  input: {
    flexGrow: 1,
    margin: '0 6px',
  },
}

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.startSaveLocationFlow = this.startSaveLocationFlow.bind(this)
  }

  startSaveLocationFlow() {
    const { startSaveLocationFlow } = this.props
    startSaveLocationFlow()
  }

  render() {
    const { globalUi, appSettings, toggleSettings, classes } = this.props
    const { settingsOpen } = globalUi
    const { saveLocation } = appSettings

    return (
      <Modal open={settingsOpen || false} onClose={() => toggleSettings(false)}>
        <Paper className={classes.paper}>
          <Typography variant="headline" className={classes.title}>Settings</Typography>
          <div className={classes.settingsRow}>
            <Button
              variant="contained"
              size="small"
              className={classes.buttons}
              onClick={this.startSaveLocationFlow}
            >
              <SaveIcon />
              Set Import/Export Location
            </Button>
            <Input
              disabled
              className={classes.input}
              value={saveLocation}
              onChange={this.handleChange}
            />
          </div>
        </Paper>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  toggleSettings,
  startSaveLocationFlow,
}

const mapStateToProps = state => ({
  appSettings: state.appSettings,
  globalUi: state.globalUi,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SettingsComponent),
)
