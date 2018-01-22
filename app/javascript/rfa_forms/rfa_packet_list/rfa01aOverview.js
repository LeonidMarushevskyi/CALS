import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import CardLayout from 'components/common/cardLayout'

export default class Rfa01AOverview extends React.Component {
  render () {
    return (
      <CardLayout
        idClassName='rfa_01a_overview'
        id='Rfa01AOverview'
        label='Rfa-01A Section Summary'
        handleOnClick={() => this.props.setFocusState('Rfa01AOverview')}
        focusClassName={this.props.getFocusClassName('Rfa01AOverview') + ' ' + 'card phone-section double-gap-top active-bar'}>
        <a href={urlPrefixHelper('/rfa/a01/' + this.props.applicationId + '/edit')} className='btn btn-default'>
          <p>Start RFA 01 A</p>
        </a>
      </CardLayout>
    )
  }
}

Rfa01AOverview.propTypes = {
  applicationId: PropTypes.string,
  setFocusState: PropTypes.func,
  getFocusClassName: PropTypes.func
}
