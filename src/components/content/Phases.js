import React from 'react'
import { connect } from 'react-redux'
// DRAFT JS
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMarkdownPlugin from 'draft-js-markdown-plugin'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import { setEpicPhase, createPhase, deletePhase } from '../../actions/'

const plugins = [createMarkdownPlugin()]
const emptyState = EditorState.createEmpty()

const styles = {
  root: {
    backgroundColor: 'rgba(27, 132, 131, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    margin: 0,
    textAlign: 'center',
  },
  editorContainer: {
    backgroundColor: '#CDD7D6',
    borderRadius: '4px',
    cursor: 'text',
    margin: '0 6px 6px',
    overflowY: 'scroll',
    padding: '8px',
    position: 'relative',
  },
  addButton: {
    backgroundColor: 'rgba(46, 158, 46, 0.9)',
    color: '#e6e6e6',
    margin: '0 auto 8px',
    '&:hover': {
      backgroundColor: 'rgba(46, 158, 46, 0.9)',
    },
  },
  deleteButton: {
    cursor: 'pointer',
    position: 'absolute',
    right: '3px',
    top: '-3px',
  },
}

class Phases extends React.Component {
  constructor(props) {
    super(props)
    const { phases } = props
    let initialEditorStates = []

    this.onChange = this.onChange.bind(this)
    this.createPhase = this.createPhase.bind(this)

    Array(phases.length).forEach(() => {
      initialEditorStates.push(emptyState)
    })

    this.state = {
      editorStates: initialEditorStates,
    }
    this._editors = []
  }

  onChange(editorState, index) {
    const { editorStates } = this.state
    const newEditorStates = [...editorStates]
    newEditorStates[index] = editorState
    this.setState({ editorStates: newEditorStates })

    const { setEpicPhase, globalUi } = this.props
    const { selectedEpic } = globalUi
    const rawEditorState = convertToRaw(editorState.getCurrentContent())
    setEpicPhase({ selectedEpic, index, content: rawEditorState })
  }

  deletePhase(e, index) {
    e.stopPropagation()

    const { deletePhase, globalUi } = this.props
    const { selectedEpic } = globalUi
    deletePhase({ selectedEpic, index })
  }

  createPhase(e) {
    const { editorStates } = this.state
    const newEditorStates = [...editorStates, emptyState]
    this.setState({ editorStates: newEditorStates })

    const { createPhase, globalUi } = this.props
    const { selectedEpic } = globalUi
    createPhase({ selectedEpic })
  }

  render() {
    const { classes, phases } = this.props
    const { editorStates } = this.state
    let editorState

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Phases</h2>
        {phases &&
          phases.map((phase, index) => {
            if (phase) {
              editorState = EditorState.createWithContent(convertFromRaw(phase))
            } else {
              editorState = emptyState
            }
            const selection = this.state.editorStates[index]
              ? this.state.editorStates[index].getSelection()
              : emptyState.getSelection()

            return (
              <div
                className={classes.editorContainer}
                onClick={this.onContainerClick}
                key={index}
              >
                <span
                  onClick={e => {
                    this.deletePhase(e, index)
                  }}
                  className={classes.deleteButton}
                >
                  &times;
                </span>
                <Editor
                  editorState={EditorState.acceptSelection(
                    editorState,
                    selection,
                  )}
                  onChange={e => this.onChange(e, index)}
                  plugins={plugins}
                />
              </div>
            )
          })}
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={this.createPhase}
        >
          <Icon>add</Icon> New Phase
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createPhase,
  deletePhase,
  setEpicPhase,
}

const mapStateToProps = state => ({
  globalUi: state.globalUi,
  phases: state.epics[state.globalUi.selectedEpic].phases,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Phases),
)
