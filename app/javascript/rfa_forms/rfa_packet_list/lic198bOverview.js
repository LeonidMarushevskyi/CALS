import React from 'react'
import PropTypes from 'prop-types'
import CardLayout from 'components/common/cardLayout'

export default class Lic198BOverview extends React.Component {
  render () {
    return (
      <CardLayout
        idClassName='lic_198b_overview'
        id='Lic198BOverview'
        label='Lic198B Section Summary'
        handleOnClick={() => this.props.setFocusState('Lic198BOverview')}
        focusClassName={this.props.getFocusClassName('Lic198BOverview') + ' ' + 'card phone-section double-gap-top active-bar'}>
        <span>default Lic198B </span>
      </CardLayout>

    )
  }
}

Lic198BOverview.propTypes = {
  applicationId: PropTypes.string,
  setFocusState: PropTypes.func,
  getFocusClassName: PropTypes.func
}
