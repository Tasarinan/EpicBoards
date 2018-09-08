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
    backgroundColor: 'rgba(100, 149, 237, 0.4)',
    borderLeft: '1px solid black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: 0,
    textAlign: 'center',
    padding: '6px 0',
  },
  editorContainer: {
    flexGrow: 1,
    padding: '4px',
    backgroundColor: '#f3f3f3',
    cursor: 'text',
    height: '1px',
    overflowY: 'scroll',
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
