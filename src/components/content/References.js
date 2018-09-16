import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import {
  setReferenceLabelInput,
  setReferenceUrlInput,
  deleteReference,
  submitReference,
} from '../../actions/'

const styles = {
  root: {
    backgroundColor: 'rgba(79, 166, 156, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    margin: 0,
    textAlign: 'center',
  },
  referencesContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    height: '36px',
    padding: '6px',
  },
  textField: {
    flexGrow: 1,
  },
  form: {
    display: 'flex',
  },
  bootstrapRoot: {
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    borderRadius: 4,
    flexGrow: 1,
    height: '36px',
    padding: 0,
    'label + &': {
      marginTop: 0,
    },
  },
  bootstrapInput: {
    padding: '6px 4px',
  },
  button: {
    color: 'green',
    height: '36px',
    width: '36px',
  },
}

class References extends React.Component {
  constructor(props) {
    super(props)
    this.submitReference = this.submitReference.bind(this)
    this.onLabelChange = this.onLabelChange.bind(this)
    this.onUrlChange = this.onUrlChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.submitReference(e)
    }
  }

  handleDelete(e, index) {
    const { deleteReference, globalUi } = this.props
    const { selectedEpic } = globalUi
    deleteReference({ selectedEpic, id: index })
  }

  onLabelChange(e) {
    const { setReferenceLabelInput } = this.props
    setReferenceLabelInput(e.target.value)
  }

  onUrlChange(e) {
    const { setReferenceUrlInput } = this.props
    setReferenceUrlInput(e.target.value)
  }

  openPage(url) {
    let shell = require('electron').shell
    shell.openExternal(url)
  }

  submitReference(e) {
    e.preventDefault()
    const { submitReference, references, globalUi } = this.props
    submitReference(globalUi)
  }

  render() {
    const { classes, globalUi, references } = this.props
    const { referenceLabel, referenceUrl } = globalUi

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>References</h2>
        <div className={classes.referencesContainer}>
          {references.map((reference, index) => {
            return (
              <Chip
                label={reference.label}
                onDelete={e => this.handleDelete(e, index)}
                onClick={e => this.openPage(reference.url)}
                className={classes.chip}
                key={`${reference.label}-${index}`}
                color="primary"
              />
            )
          })}
        </div>
        <div className={classes.inputContainer}>
          <form className={classes.form}>
            <TextField
              id="label"
              className={classes.textField}
              value={referenceLabel}
              placeholder="Label"
              onChange={this.onLabelChange}
              onKeyDown={this.onKeyDown}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput,
                },
              }}
            />
            <TextField
              id="url"
              className={classes.textField}
              value={referenceUrl}
              placeholder="URL"
              onChange={this.onUrlChange}
              onKeyDown={this.onKeyDown}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                  input: classes.bootstrapInput,
                },
              }}
            />
            <IconButton
              className={classes.button}
              onClick={this.submitReference}
            >
              <Icon>add_circle</Icon>
            </IconButton>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  submitReference,
  setReferenceLabelInput,
  setReferenceUrlInput,
  deleteReference,
}

const mapStateToProps = state => ({
  globalUi: state.globalUi,
  references: state.epics[state.globalUi.selectedEpic].references,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(References),
)
