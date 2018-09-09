import React from 'react'
import { connect } from 'react-redux'
// DRAFT JS
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMarkdownPlugin from 'draft-js-markdown-plugin'

import { withStyles } from '@material-ui/core/styles'

import { setEpicGoodBetterBest } from '../../actions/'

const plugins = [createMarkdownPlugin()]
const emptyState = EditorState.createEmpty()

const styles = {
  root: {
    backgroundColor: 'rgba(255, 152, 0, 0.4)',
    borderLeft: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    margin: 0,
    padding: '6px 0',
    textAlign: 'center',
  },
  contentContainer: {
    borderBottom: '1px solid black',
    cursor: 'text',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '1px',
  },
  expand: {
    backgroundColor: '#CDD7D6',
    borderRadius: '4px',
    flexGrow: 1,
    margin: '0 6px 6px',
    overflowY: 'scroll',
    padding: '8px',
  },
}

const headers = ['Good', 'Better', 'Best']

class GoodBetterBest extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = {
      editorStates: [emptyState, emptyState, emptyState],
    }
    this._editors = []
  }

  onChange(editorState, index) {
    const { editorStates } = this.state
    const newEditorStates = [...editorStates]
    newEditorStates[index] = editorState
    this.setState({ editorStates: newEditorStates })
    const { setEpicGoodBetterBest, globalUi } = this.props
    const { selectedEpic } = globalUi
    const rawEditorState = convertToRaw(editorState.getCurrentContent())
    setEpicGoodBetterBest({ selectedEpic, index, content: rawEditorState })
  }

  onContainerClick(index) {
    this._editors[index].focus()
  }

  render() {
    const { classes, contents = ['', '', ''] } = this.props
    let editorState

    return (
      <div className={classes.root}>
        {contents.map((content, index) => {
          const noBorderClass = index === 2 ? { border: 0 } : {}
          if (content) {
            editorState = EditorState.createWithContent(convertFromRaw(content))
          } else {
            editorState = emptyState
          }

          return (
            <div
              className={classes.contentContainer}
              style={noBorderClass}
              key={index}
            >
              <h2 className={classes.title}>{headers[index]}</h2>
              <div
                className={classes.expand}
                onClick={() => this.onContainerClick(index)}
              >
                <Editor
                  ref={c => (this._editors[index] = c)}
                  editorState={EditorState.acceptSelection(
                    editorState,
                    this.state.editorStates[index].getSelection(),
                  )}
                  onChange={e => this.onChange(e, index)}
                  plugins={plugins}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = {
  setEpicGoodBetterBest,
}

const mapStateToProps = state => ({
  globalUi: state.globalUi,
  contents: state.epics[state.globalUi.selectedEpic].goodBetterBest,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GoodBetterBest),
)
