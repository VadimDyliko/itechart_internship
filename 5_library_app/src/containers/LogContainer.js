import React from 'react';
import { connect } from 'react-redux';
import { suGetLog } from '../actions/su';
import Log from '../components/Log/Log'

class LogContainer extends React.PureComponent {

  componentDidMount() {
    this.suGetLog(20)
  }

  suGetLog = value => {
    this.props.onSuGetLog(value)
  }

  render () {
    return(
      <Log log={this.props.log} suGetLog={this.suGetLog}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    log: state.su.file
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuGetLog: (value) => dispatch(suGetLog(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogContainer);
