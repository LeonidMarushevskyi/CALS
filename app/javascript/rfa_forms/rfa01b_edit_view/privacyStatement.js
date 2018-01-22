import React from 'react'
import PropTypes from 'prop-types'

import {BinarySelectorField} from 'components/common/binarySelectorField'
import CardLayout from 'components/common/cardLayout'
import {Rfa01bPrivacyStatement, toggleInstructionStyle} from 'constants/rfaText'

export default class PrivacyStatement extends React.Component {
  render () {
    return (
      <CardLayout
        idClassName='privacy_statement'
        id='PrivacyStatementCard'
        textAlignment='left'
        label='Privacy Statement'
        handleOnClick={() => this.props.setFocusState('PrivacyStatementCard')}
        focusClassName={this.props.getFocusClassName('PrivacyStatementCard') + ' ' + 'card phone-section double-gap-top active-bar'}
        showHeaderLink
        headerToggleId='privacyStatementToggle'
        headerDisplayLink={this.props.privacyStatementDisplay}
        onHeaderToggleClick={() => this.props.setDisplayState('privacyStatementDisplay',
          !this.props.privacyStatementDisplay)}>
        <div >
          {
            this.props.privacyStatementDisplay
              ? <div className='row list-item'>
                <div>{Rfa01bPrivacyStatement.privacyStatememtA} </div>
                <br />
                <div>{Rfa01bPrivacyStatement.privacyStatememtB} </div>
              </div>
              : null
          }
        </div>
      </CardLayout>
    )
  }
}

PrivacyStatement.propTypes = {
  focusComponentName: PropTypes.string,
  getFocusClassName: PropTypes.func,
  privacyStatementDisplay: PropTypes.bool,
  setDisplayState: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func
}

PrivacyStatement.defaultProps = {
  privacyStatementDisplay: false,
  errors: []
}
