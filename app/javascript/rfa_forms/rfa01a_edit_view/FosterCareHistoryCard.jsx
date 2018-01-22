
import React from 'react'
import {yesNo} from 'constants/constants'
import {FosterCareHistoryFields} from './FosterCareHistoryFields'

export default class FosterCareHistoryCard extends React.Component {
  render () {
    return (
      <div className='foster_care_history_cards'>
        <div id='FosterCareHistorySection' onClick={() => this.props.setFocusState('FosterCareHistoryCard')}
          className={this.props.getFocusClassName('FosterCareHistoryCard') + ' ' + 'card phone-section double-gap-top active-bar'}>
          <div className='card-header'><span>Information</span></div>
          <FosterCareHistoryFields
            yesNo={yesNo}
            fosterCareHistory={this.props.fosterCareHistory}
            {...this.props}
          />
        </div>
      </div>
    )
  }
}
