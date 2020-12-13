import React, { useState } from 'react'
import {Alert} from 'react-bootstrap'

type OutdatedBrowserWarningProps = {
  initialShow: boolean
}

type OutdatedBrowserWarningState = {
  alertVisible: boolean
}

const OutdatedBrowserWarning: React.FC<OutdatedBrowserWarningProps> = ({initialShow}) => {
  const [alertVisible, setAlertVisible] = useState(initialShow)

  if(alertVisible){
    return (
      <Alert variant="danger" onClose={() => setAlertVisible(false)}>
        <h4>Sorry, your browser is not supported</h4>
        <p>Try <a target="_blank" href="http://outdatedbrowser.com/"> updading your browser</a>.</p>
      </Alert>
    );
  } else {
    return null
  }
}

export default OutdatedBrowserWarning
