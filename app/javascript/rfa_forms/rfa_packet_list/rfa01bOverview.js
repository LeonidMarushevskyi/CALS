import React from 'react'
import PropTypes from 'prop-types'
import CardLayout from 'components/common/cardLayout'
import Rfa01bCreateLink from './rfa01bCreateLink'
import Rfa01bEditLink from './rfa01bEditLink'

export default class Rfa01BOverview extends React.Component {
  render () {
    let applicationId = this.props.applicationId
    let rfa01A = this.props.rfa01A
    let applicants = rfa01A.applicants
    let otherAdults = rfa01A.other_adults
    let summary = this.props.rfaPacketSummary

    return (
      <CardLayout
        idClassName='rfa_01b_overview'
        id='Rfa01BOverview'
        label='Rfa-01B Section Summary'
        handleOnClick={() => this.props.setFocusState('Rfa01BOverview')}
        focusClassName={this.props.getFocusClassName('Rfa01BOverview') + ' ' + 'card phone-section double-gap-top active-bar'}>

        {applicants && applicants.map((applicant, index) => {
          return (

            (applicant.rfa1b_form && applicant.rfa1b_form.id > 0)
              ? <div key={'rfa01bEdit.applicant' + index}>
                <Rfa01bEditLink
                  index={index}
                  adult={applicant}
                  applicationId={applicationId}
                  rfa01bId={applicant.rfa1b_form.id} />
              </div>
              : <div key={'rfa01bCreate.applicant' + index}>
                <Rfa01bCreateLink
                  index={index}
                  adult={applicant}
                  apiUrlPath={'applicants'}
                  applicationId={applicationId} />
              </div>
          )
        })}

        {otherAdults && otherAdults.map((otherAdult, index) => {
          return (
            otherAdult.rfa1b_form && otherAdult.rfa1b_form.id > 0
              ? <div key={'rfa01bEdit.otherAdult' + index}>
                <Rfa01bEditLink
                  index={index}
                  adult={otherAdult}
                  rfa01bId={otherAdult.rfa1b_form.id}
                  applicationId={applicationId} />
              </div>
              : <div key={'rfa01bCreate.otherAdult' + index}>
                <Rfa01bCreateLink
                  index={index}
                  adult={otherAdult}
                  apiUrlPath={'other-adults'}
                  applicationId={applicationId} />
              </div>)
        })}
      </CardLayout>
    )
  }
}

Rfa01BOverview.propTypes = {
  applicationId: PropTypes.string,
  setFocusState: PropTypes.func,
  getFocusClassName: PropTypes.func
}
