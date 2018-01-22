import React from 'react'
import PropTypes from 'prop-types'
import CardLayout from 'components/common/cardLayout'
import Rfa01cCreateLink from './rfa01cCreateLink'
import Rfa01cEditLink from './rfa01cEditLink'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'

const blankChildIdentified = Object.freeze({
  child_identified: false
})

export default class Rfa01COverview extends React.Component {
  render () {
    let applicationId = this.props.applicationId
    let rfa01CForm = this.props.rfa01CForm
    let childIdentified = this.props.childDesired.child_identified
    return (
      <CardLayout
        idClassName='rfa_01c_overview'
        id='Rfa01COverview'
        label='Rfa-01C Section Summary'
        handleOnClick={() => this.props.setFocusState('Rfa01COverview')}
        focusClassName={this.props.getFocusClassName('Rfa01COverview') + ' ' + 'card phone-section double-gap-top active-bar'}>
        {childIdentified && rfa01CForm !== null ? <Rfa01cEditLink
          applicationId={applicationId}
          rfa01CForm={rfa01CForm} /> : (childIdentified ? <Rfa01cCreateLink
          applicationId={applicationId}
          rfa01CForm={rfa01CForm} /> : '')
        }

      </CardLayout>
    )
  }
}

Rfa01COverview.propTypes = {
  applicationId: PropTypes.string,
  childDesired: PropTypes.object,
  setFocusState: PropTypes.func,
  rfa01CForm: PropTypes.object,
  getFocusClassName: PropTypes.func
}

Rfa01COverview.defaultProps = {
  childDesired: blankChildIdentified
}
