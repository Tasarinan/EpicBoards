import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'
import React from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const styles = {
  root: {
    backgroundColor: 'rgba(76, 175, 80, 0.4)',
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
    padding: '4px',
    backgroundColor: 'rgb(244, 255, 232)',
    cursor: 'text',
    overflowY: 'scroll',
    margin: '12px 4px',
  },
}

class Phases extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.addPhase = this.addPhase.bind(this)
    this.state = {
      phases: [],
    }
    this.baseEditorState = {
      editorState: EditorState.createEmpty(),
      plugins: [createMarkdownPlugin()],
    }
  }

  componentDidMount() {
    // const data = require('electron').remote.getCurrentWindow().epicData
    // const { phases } = data
    // this.setState({ phases: phases })
  }

  onChange(editorState, index) {
    const { phases } = this.state
    const currentPhase = phases[index]
    const newPhase = {
      ...currentPhase,
      editorState: editorState,
    }
    const newPhases = [
      ...phases.slice(0, index),
      newPhase,
      ...phases.slice(index + 1),
    ]
    this.setState({ phases: newPhases })
  }

  addPhase(e) {
    const { phases } = this.state
    const newPhases = [...phases, this.baseEditorState]
    this.setState({ phases: newPhases })
  }

  render() {
    const { classes } = this.props
    const { editorState, plugins, phases } = this.state

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Phases</h2>
        {phases &&
          phases.map((phase, index) => {
            return (
              <div
                className={classes.editorContainer}
                onClick={this.onContainerClick}
                key={index}
              >
                <Editor
                  editorState={phase.editorState}
                  onChange={e => this.onChange(e, index)}
                  plugins={phase.plugins}
                />
              </div>
            )
          })}
        <Button variant="contained" color="primary" onClick={this.addPhase}>
          <Icon>add</Icon> New Phase
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Phases)
