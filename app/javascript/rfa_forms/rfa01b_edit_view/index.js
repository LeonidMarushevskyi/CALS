import React from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import {fetchRequest} from 'helpers/http'

import OutOfStateDisclosureCard from './outOfStateDisclosureCard'
import ApplicantDetailsCard from './applicantDetailsCard'
import DisclosureInstructions from './disclosureInstructions'
import CaliforniaCriminalBackground from './californiaCriminalBackground'
import OutsideCACriminalBackground from './outsideCACriminalBackground'
import CrimeBackgroundAgainstCohabitant from './crimeBackgroundAgainstCohabitant'
import PrivacyStatement from './privacyStatement'
import {CountyUseOnlyCard} from 'components/rfa_forms/countyUseOnlyCard.js'
import {getDictionaryId, dictionaryNilSelect, checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import CardsGroupLayout from 'components/common/cardsGroupLayout.js'
import {addCardAsJS, getFocusClassName, removeCard} from 'helpers/cardsHelper.jsx'
import Validator from 'helpers/validator'
import {disclosureDefaults} from 'constants/defaultFields'
// import '../rfa01a_edit_view/stylesheets/cards-main.scss'

export default class Rfa01bList extends React.Component {
  constructor (props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
    this.setFocusState = this.setFocusState.bind(this)
    this.setApplicationState = this.setApplicationState.bind(this)
    this.setDisplayState = this.setDisplayState.bind(this)
    this.handleClearOnConditionalChange = this.handleClearOnConditionalChange.bind(this)
    this.validator = new Validator({})
    this.validator.validateFieldSetErrorState = this.validateFieldSetErrorState.bind(this)

    this.state = {
      application_id: this.props.application_id,
      application: this.props.rfa_b01_application,
      disclosureInstructionsDisplay: null,
      privacyStatementDisplay: null,
      focusComponentName: '',
      errors: {}
    }
  }

  validateFieldSetErrorState (fieldName, value) {
    const error = this.validator.validateFieldAndGetError(fieldName, value)

    let currentErrors = this.state.errors
    if (error === undefined) {
      _.unset(currentErrors, fieldName)
    } else {
      _.set(currentErrors, fieldName, error)
    }
    this.setState({errors: currentErrors})
  }

  submitForm () {
    let url = '/rfa/b01/' + this.props.application_id
    fetchRequest(url, 'PUT', this.state).then(
      response => response.json()).then((response) => {
      return this.setState({
        formData: response
      })
    })
      .catch(error => {
        return this.setState({
          data: error
        })
      })
  }

  setFocusState (focusComponentName) {
    this.setState({focusComponentName: focusComponentName})
  }

  getFocusClassName (componentName) {
    return this.state.focusComponentName === componentName ? 'edit' : 'show'
  }

  setApplicationState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.setIn(['application', key], value)
    this.setState(newState.toJS())
  }

  setDisplayState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.set(key, value)
    this.setState(newState.toJS())
  }

  handleClearOnConditionalChange (key, value, hiddenKey, hiddenDefaultValue) {
    if (value === 'false') {
      let newState = Immutable.fromJS(this.state)
      newState = newState.setIn(['application', key], value)
      newState = newState.setIn(['application', hiddenKey], hiddenDefaultValue)
      this.setState(newState.toJS())
    } else {
      this.setApplicationState(key, value)
    }
  }

  render () {
    const countyValue = getDictionaryId(this.state.application.application_county) || (this.props.user && this.props.user.county_code)

    return (

      <div className='main_page'>
        <div className='header_cwds col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='header-logo' />
        </div>
        <div className='form-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='left-content col-xs-9 col-sm-9 col-md-9 col-lg-9'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <div className='col-xs-10 col-sm-10 col-md-10 col-lg-10'>
                <h1 className='page-header'>Resource Family Criminal Record Statement (RFA 01B)</h1>
                <h3><span>Confidential Document - For County Use Only</span></h3>
                <p>Instructions: Each Resource Family applicant and adult residing
                   in or regularly present in the home must complete this Criminal
                    Record Statement</p>
              </div>
              <div className='col-xs-2 col-sm-2 col-md-2 col-lg-2'>
                <button id='saveProgress' className='btn btn-default' onClick={this.submitForm}>Save Progress</button>
              </div>
            </div>
            <CardsGroupLayout>
              <CountyUseOnlyCard
                countyUseOnlyCardId='county_use_only'
                setFocusState={this.setFocusState}
                getFocusClassName={this.getFocusClassName}
                county={countyValue}
                CountyList={this.props.countyTypes}
                onFieldChange={(event) => this.setApplicationState('application_county',
                  dictionaryNilSelect(event.target.options))} />
            </CardsGroupLayout>

            <CardsGroupLayout>
              <h2>I.<span>Out of State Disclosure</span></h2>
              <OutOfStateDisclosureCard
                livedInOtherState={this.state.application.lived_in_other_state}
                otherStatesOfLiving={this.state.application.other_states_of_living}
                stateTypes={this.props.stateTypes}
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                setFocusState={this.setFocusState}
                handleClearOnConditionalChange={this.handleClearOnConditionalChange}
                setParentState={this.setApplicationState} />
            </CardsGroupLayout>
            <CardsGroupLayout>
              <h2>II.<span>Criminal Record Statement</span></h2>
              <DisclosureInstructions
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                disclosureInstructionsDisplay={this.state.disclosureInstructionsDisplay}
                setDisplayState={this.setDisplayState}
                setFocusState={this.setFocusState}
                setParentState={this.setApplicationState} />
            </CardsGroupLayout>

            <CardsGroupLayout>
              <CaliforniaCriminalBackground
                convictedInCalifornia={this.state.application.convicted_in_california}
                disclosures={checkArrayObjectPresence(this.state.application.convicted_in_california_disclosures) || [disclosureDefaults]}
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                setFocusState={this.setFocusState}
                handleClearOnConditionalChange={this.handleClearOnConditionalChange}
                setParentState={this.setApplicationState} />
            </CardsGroupLayout>

            <CardsGroupLayout>
              <OutsideCACriminalBackground
                convictedInAnotherState={this.state.application.convicted_in_another_state}
                disclosures={checkArrayObjectPresence(this.state.application.convicted_in_another_state_disclosures) || [disclosureDefaults]}
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                setFocusState={this.setFocusState}
                handleClearOnConditionalChange={this.handleClearOnConditionalChange}
                setParentState={this.setApplicationState} />
            </CardsGroupLayout>

            <CardsGroupLayout>
              <CrimeBackgroundAgainstCohabitant
                arrestedForCrime={this.state.application.arrested_for_crime}
                disclosures={checkArrayObjectPresence(this.state.application.arrested_for_crime_disclosures) || [disclosureDefaults]}
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                setFocusState={this.setFocusState}
                handleClearOnConditionalChange={this.handleClearOnConditionalChange}
                setParentState={this.setApplicationState} />
            </CardsGroupLayout>

            <CardsGroupLayout>
              <PrivacyStatement
                privacyStatementDisplay={this.state.privacyStatementDisplay}
                setDisplayState={this.setDisplayState}
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                setFocusState={this.setFocusState} />
            </CardsGroupLayout>

            <CardsGroupLayout>
              <h2><span>Applicant or Other Adult </span></h2>
              <ApplicantDetailsCard
                application={this.state.application}
                validator={this.validator}
                focusComponentName={this.state.focusComponentName}
                getFocusClassName={this.getFocusClassName}
                setFocusState={this.setFocusState}
                setParentState={this.setApplicationState}
                stateTypes={this.props.stateTypes}
                namePrefixTypes={this.props.namePrefixTypes}
                nameSuffixTypes={this.props.nameSuffixTypes} />
            </CardsGroupLayout>
          </div>
        </div>
      </div>

    )
  }
}
