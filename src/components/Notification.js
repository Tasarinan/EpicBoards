import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { toggleNotification } from '../actions'

const styles = {}

class Notification extends React.Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false,
    }
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    const { toggleNotification } = this.props
    toggleNotification(false)
  }

  render() {
    const { classes, globalUi } = this.props
    const { notificationOpen, notificationContent } = globalUi

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={notificationOpen}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={<span id="message-id">{notificationContent}</span>}
          action={[
            <IconButton
              key="close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}


const mapDispatchToProps = {
  toggleNotification,
}

const mapStateToProps = state => ({
  globalUi: state.globalUi,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Notification),
)

