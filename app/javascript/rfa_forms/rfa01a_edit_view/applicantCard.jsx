import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import NameCard from './nameCard'
import {checkArrayObjectPresence} from 'helpers/commonHelper'
import PhoneComponent from './phoneNumberCardsGroup.jsx'
import AboutApplicant from './aboutApplicantCard.jsx'
import Employment from './employmentCard.jsx'

export default class ApplicantCard extends React.Component {
  constructor (props) {
    super(props)

    this.setApplicantState = this.setApplicantState.bind(this)
  }

  setApplicantState (key, value) {
    let applicantData = Immutable.fromJS(this.props.applicantFields)
    applicantData = applicantData.set(key, value)
    this.props.setParentState(this.props.index, applicantData.toJS())
  }

  render () {
    const idPrefix = 'applicants' + '[' + this.props.index + '].'

    return (
      <div className='cards'>

        <div id={idPrefix + 'nameSection'} onClick={() => this.props.setFocusState('NameCard')}
          className={this.props.getFocusClassName('NameCard') + ' ' + 'card name-section double-gap-top active-bar'}>

          <div className='card-header'>
            <span>Name</span>
          </div>
          <NameCard
            idPrefix={idPrefix}
            nameTypes={this.props.nameTypes}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes}
            nameFields={this.props.applicantFields}
            setParentState={this.setApplicantState}
            validator={this.props.validator}
            errors={this.props.errors}
            hasValidName={this.props.hasValidName} />
        </div>

        <div id={idPrefix + 'aboutAppSection'} onClick={() => this.props.setFocusState('AboutApplicantCard')}
          className={this.props.getFocusClassName('AboutApplicantCard') + ' ' + 'card aboutApp-section double-gap-top active-bar'}>

          <div className='card-header'>
            <span>More About Applicant</span>
          </div>
          <AboutApplicant
            idPrefix={idPrefix}
            stateTypes={this.props.stateTypes}
            educationLevels={this.props.educationLevels}
            genderTypes={this.props.genderTypes}
            // raceTypes={this.props.raceTypes}
            ethnicityTypes={this.props.ethnicityTypes}
            languageTypes={this.props.languageTypes}
            applicantFields={this.props.applicantFields}
            setParentState={this.setApplicantState}
            validator={this.props.validator}
            errors={this.props.errors} />
        </div>

        <div id={idPrefix + 'employmentSection'} onClick={() => this.props.setFocusState('EmploymentCard')}
          className={this.props.getFocusClassName('EmploymentCard') + ' ' + 'card employment-section double-gap-top active-bar'}>

          <div className='card-header'>
            <span>Employment</span>
          </div>
          <Employment
            stateTypes={this.props.stateTypes}
            salaryTypes={this.props.salaryTypes}
            employment={this.props.applicantFields.employment}
            setParentState={this.setApplicantState} />
        </div>

        <div id={idPrefix + 'phoneSection'} onClick={() => this.props.setFocusState(idPrefix + 'PhoneNumbersCard')}
          className={this.props.getFocusClassName(idPrefix + 'PhoneNumbersCard') + ' ' + 'card phone-section double-gap-top active-bar'}>

          <div className='card-header'>
            <span>Phone Number</span>
          </div>
          <PhoneComponent
            idPrefix={idPrefix}
            phoneTypes={this.props.phoneTypes}
            applicant_id={this.props.index}
            phones={checkArrayObjectPresence(this.props.applicantFields.phones) || undefined}
            setParentState={this.setApplicantState}
            validator={this.props.validator}
            errors={this.props.errors.phones} />

        </div>
      </div>
    )
  }
}

ApplicantCard.propTypes = {
  index: PropTypes.number.isRequired,
  phoneTypes: PropTypes.array.isRequired,
  salaryTypes: PropTypes.array.isRequired,
  stateTypes: PropTypes.array.isRequired,
  educationLevels: PropTypes.array.isRequired,
  genderTypes: PropTypes.array.isRequired,
  // raceTypes: PropTypes.array.isRequired,
  ethnicityTypes: PropTypes.array.isRequired,
  languageTypes: PropTypes.array.isRequired,
  //  focusComponentName: PropTypes.string.isRequired,
  applicantFields: PropTypes.object.isRequired,
  setParentState: PropTypes.func.isRequired
//  setFocusState: PropTypes.func.isRequired
}

ApplicantCard.defaultProps = {
  errors: {}
}
