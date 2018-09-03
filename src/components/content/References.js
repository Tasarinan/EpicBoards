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
    backgroundColor: 'rgba(244, 67, 54, 0.4)',
    borderTop: '1px solid black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: 0,
    textAlign: 'center',
    padding: '6px 0',
  },
  referencesContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    height: '36px',
  },
  textField: {
    flexGrow: 1,
  },
  form: {
    display: 'flex',
  },
  bootstrapRoot: {
    height: '36px',
    padding: 0,
    flexGrow: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    'label + &': {
      marginTop: 0,
    },
  },
  button: {
    height: '36px',
    width: '36px',
    color: 'green',
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
    const { setLabelInput } = this.props
    setLabelInput(e.target.value)
  }

  onUrlChange(e) {
    const { setUrlInput } = this.props
    setUrlInput(e.target.value)
  }

  openPage(url) {
    window.open(url, '_blank')
  }

  submitReference(e) {
    e.preventDefault()
    const { submitReference, references, globalUi } = this.props
    submitReference(globalUi)
  }

  render() {
    const { classes, globalUi, references } = this.props
    const { labelInput, urlInput } = globalUi

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
              value={labelInput}
              placeholder="Label"
              onChange={this.onLabelChange}
              onKeyDown={this.onKeyDown}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
                },
              }}
            />
            <TextField
              id="url"
              className={classes.textField}
              value={urlInput}
              placeholder="URL"
              onChange={this.onUrlChange}
              onKeyDown={this.onKeyDown}
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.bootstrapRoot,
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

const mapDispatchToProps = dispatch => ({
  submitReference: payload => {
    dispatch(submitReference(payload))
  },
  setLabelInput: payload => {
    dispatch(setReferenceLabelInput(payload))
  },
  setUrlInput: payload => {
    dispatch(setReferenceUrlInput(payload))
  },
  deleteReference: payload => {
    dispatch(deleteReference(payload))
  },
})

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
