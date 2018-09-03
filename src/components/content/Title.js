import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { setTitleContent } from '../../actions/App'

const styles = {
  root: {
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderBottom: '1px solid black',
    height: '100%',
    width: '100%',
  },
  textarea: {
    border: '0px',
    fontSize: '36px',
    fontWeight: 'bold',
    height: '43px',
    lineHeight: '40px',
    margin: '0px',
    outline: 'none',
    resize: 'none',
    textTransform: 'capitalize',
    width: '100%',
  },
}

class Title extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { setTitleContent } = this.props
    setTitleContent(e.target.value)
  }

  render() {
    const { classes, content } = this.props

    return (
      <div className={classes.root}>
        <textarea
          className={classes.textarea}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={content}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setTitleContent: content => {
    dispatch(setTitleContent(content))
  },
})

const mapStateToProps = state => ({
  content: state.app.title,
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Title),
)
