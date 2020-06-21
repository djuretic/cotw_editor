import React from 'react'
import {Alert} from 'react-bootstrap'

type OutdatedBrowserWarningProps = {
  initialShow: boolean
}

type OutdatedBrowserWarningState = {
  alertVisible: boolean
}

class OutdatedBrowserWarning extends React.Component<OutdatedBrowserWarningProps, OutdatedBrowserWarningState> {
  state: OutdatedBrowserWarningState = {alertVisible: this.props.initialShow}

  handleDismiss() {
    this.setState({alertVisible: false});
  }

  render() {
    if(this.state.alertVisible){
      return (
        <Alert variant="danger" onClose={this.handleDismiss}>
          <h4>Sorry, your browser is not supported</h4>
          <p>Try <a target="_blank" href="http://outdatedbrowser.com/"> updading your browser</a>.</p>
        </Alert>
      );
    } else {
      return null
    }
  }
}

export default OutdatedBrowserWarning
