import React from 'react'
import { connect } from 'react-redux'
// DRAFT JS
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMarkdownPlugin from 'draft-js-markdown-plugin'

import { withStyles } from '@material-ui/core/styles'

import { setEpicProblem } from '../../actions/'

const plugins = [createMarkdownPlugin()]
const emptyState = EditorState.createEmpty()

const styles = {
  root: {
    backgroundColor: 'rgba(196, 79, 71, 0.5)',
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
    flexGrow: 1,
    fontFamily: 'Roboto',
    height: '1px',
    margin: '0 6px 6px',
    overflowY: 'scroll',
    padding: '8px',
  },
}

class Problem extends React.Component {
  constructor(props) {
    super(props)
    this.onContainerClick = this.onContainerClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorState: emptyState,
    }
  }

  onChange(editorState) {
    this.setState({ editorState })
    const { setEpicProblem, globalUi } = this.props
    const { selectedEpic } = globalUi
    const rawEditorState = convertToRaw(editorState.getCurrentContent())
    setEpicProblem({ selectedEpic, content: rawEditorState })
  }

  onContainerClick(e) {
    this._editor.focus()
  }

  render() {
    const { classes, content } = this.props

    let editorState
    if (content) {
      editorState = EditorState.createWithContent(convertFromRaw(content))
    } else {
      editorState = emptyState
    }

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Problem</h2>
        <div
          className={classes.editorContainer}
          onClick={this.onContainerClick}
        >
          <Editor
            ref={c => (this._editor = c)}
            editorState={EditorState.acceptSelection(
              editorState,
              this.state.editorState.getSelection(),
            )}
            onChange={this.onChange}
            plugins={plugins}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setEpicProblem,
}

const mapStateToProps = state => ({
  globalUi: state.globalUi,
  content: state.epics[state.globalUi.selectedEpic].problem,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Problem),
)
