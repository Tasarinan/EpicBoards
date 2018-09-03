import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import {
  setLabelInput,
  setUrlInput,
  deleteReference,
  submitReference,
} from '../../actions/references'

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

  onLabelChange(e) {
    const { setLabelInput, clearReferences } = this.props
    setLabelInput(e.target.value)
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.submitReference(e)
    }
  }

  handleDelete(e, index) {
    const { deleteReference } = this.props
    deleteReference(index)
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
    const { submitReference, references } = this.props
    const { labelInput, urlInput } = references
    submitReference({ labelInput, urlInput })
  }

  render() {
    const { classes, references } = this.props
    const { records, labelInput, urlInput } = references

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>References</h2>
        <div className={classes.referencesContainer}>
          {records.map((reference, index) => {
            return (
              <Chip
                label={reference.labelInput}
                onDelete={(e) => this.handleDelete(e, index)}
                onClick={(e) => this.openPage(reference.urlInput)}
                className={classes.chip}
                key={`${reference.labelInput}-${index}`}
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
            <IconButton className={classes.button} onClick={this.submitReference}>
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
    dispatch(setLabelInput(payload))
  },
  setUrlInput: payload => {
    dispatch(setUrlInput(payload))
  },
  deleteReference: payload => {
    dispatch(deleteReference(payload))
  },
})

const mapStateToProps = state => ({
  references: state.references,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(References),
)
