import React from 'react'
import {yesNo} from 'constants/constants'
import Immutable from 'immutable'
import ApplicantMaritalHistoryCard from './applicantMaritalHistoryCard'
import AdultChildrenFields from './adultChildrenFields'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'

export const relationshipToAdultsDefaults = Object.freeze({
  applicant_id: '',
  relationship_to_applicant: null
})

export const addressDefaults = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: null
})

export const adultChildrenDefaults = Object.freeze({
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_suffix: null,
  relationship_to_applicants: [
    relationshipToAdultsDefaults
  ],
  lives_in_home: '',
  address: addressDefaults
})

export const formerSpousesDefaults = Object.freeze({
  relationship_type: null,
  applicant_id: '',
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_suffix: null,
  date_of_marriage: '',
  place_of_marriage_city: '',
  place_of_marriage_state: null,
  marriage_termination_reason: null,
  date_of_marriage_end: '',
  place_of_marriage_end_city: '',
  place_of_marriage_end_state: null
})

export const applicantsHistoryDefaults = Object.freeze({
  former_spouses: [formerSpousesDefaults],
  adult_children: [adultChildrenDefaults]
})

export default class ApplicantMaritalHistoryCardGroup extends React.Component {
  constructor (props) {
    super(props)
    this.addMaritalHistoryCard = this.addMaritalHistoryCard.bind(this)
    this.addAdultChildCard = this.addAdultChildCard.bind(this)

    this.changeMaritalHistory = this.changeMaritalHistory.bind(this)
    this.changeAdultChild = this.changeAdultChild.bind(this)
    this.changeAdultHistoryAddress = this.changeAdultHistoryAddress.bind(this)
    this.handleRelationshipTypeToApplicantFormerSpouse = this.handleRelationshipTypeToApplicantFormerSpouse.bind(this)
    this.handleRelationshipTypeToApplicantAdultChild = this.handleRelationshipTypeToApplicantAdultChild.bind(this)
    this.onMaritalHistoryClickClose = this.onMaritalHistoryClickClose.bind(this)
    this.onAdultChildClickClose = this.onAdultChildClickClose.bind(this)
    this.updateNestedCards = this.updateNestedCards.bind(this)
  }

  updateNestedCards (newCardFields, type) {
    let maritalHistory = Immutable.fromJS(this.props.applicantsHistory)
    let updatedMaritalHistory = maritalHistory.set(type, Immutable.fromJS(newCardFields))
    this.props.setParentState('applicantsHistory', updatedMaritalHistory.toJS())
  }

  addMaritalHistoryCard (event, formerSpouses) {
    event.preventDefault()
    let newSpouseFields = addCardAsJS(formerSpouses, formerSpousesDefaults)
    this.updateNestedCards(newSpouseFields, 'former_spouses')
  }

  addAdultChildCard (event, adultChildren) {
    event.preventDefault()
    let newAdultFields = addCardAsJS(adultChildren, adultChildrenDefaults)
    this.updateNestedCards(newAdultFields, 'adult_children')
  }

  onMaritalHistoryClickClose (index) {
    let formerSpousesList = removeCard(this.props.applicantsHistory.former_spouses, index, formerSpousesDefaults)
    this.updateNestedCards(formerSpousesList, 'former_spouses')
  }

  onAdultChildClickClose (index) {
    let adultChildrenList = removeCard(this.props.applicantsHistory.adult_children, index, adultChildrenDefaults)
    this.updateNestedCards(adultChildrenList, 'adult_children')
  }

  changeAdultChild (type, value, adultChildIndex) {
    let maritalHistory = Immutable.fromJS(this.props.applicantsHistory)
    let adultChildrenList = Immutable.fromJS(this.props.applicantsHistory.adult_children)
    adultChildrenList = adultChildrenList.update(adultChildIndex, x => x.set(type, value))
    let updatedMaritalHistory = maritalHistory.set('adult_children', adultChildrenList)
    this.props.setParentState('applicantsHistory', updatedMaritalHistory.toJS())
  }

  changeMaritalHistory (type, value, formerSpuseIndex) {
    let maritalHistory = Immutable.fromJS(this.props.applicantsHistory)
    let formerSpousesList = Immutable.fromJS(this.props.applicantsHistory.former_spouses)
    formerSpousesList = formerSpousesList.update(formerSpuseIndex, x => x.set(type, value))
    let updatedMaritalHistory = maritalHistory.set('former_spouses', formerSpousesList)
    this.props.setParentState('applicantsHistory', updatedMaritalHistory.toJS())
  }

  changeAdultHistoryAddress (type, value, index) {
    let maritalHistory = Immutable.fromJS(this.props.applicantsHistory)
    let adultChildrenList = Immutable.fromJS(this.props.applicantsHistory.adult_children)
    let address = Immutable.fromJS(this.props.applicantsHistory.adult_children[index].address)
    address = address.set(type, value)
    this.changeAdultChild('address', address, index)
  }

  handleRelationshipTypeToApplicantFormerSpouse (index, value, type) {
    let maritalHistory = Immutable.fromJS(this.props.applicantsHistory)
    let formerSpousesList = Immutable.fromJS(this.props.applicantsHistory.former_spouses)
    formerSpousesList = formerSpousesList.setIn([index, 'relationship_to_applicants', 0, type], value)
    let updatedMaritalHistory = maritalHistory.set('former_spouses', formerSpousesList)
    this.props.setParentState('applicantsHistory', updatedMaritalHistory.toJS())
  }

  handleRelationshipTypeToApplicantAdultChild (index, value, type) {
    let maritalHistory = Immutable.fromJS(this.props.applicantsHistory)
    let adultChildrenList = Immutable.fromJS(this.props.applicantsHistory.adult_children)
    adultChildrenList = adultChildrenList.setIn([index, 'relationship_to_applicants', 0, type], value)
    let updatedMaritalHistory = maritalHistory.set('adult_children', adultChildrenList)
    this.props.setParentState('applicantsHistory', updatedMaritalHistory.toJS())
  }

  render () {
    let applicantsHistory = this.props.applicantsHistory
    let applicantMaritalHistories = applicantsHistory && applicantsHistory.former_spouses
    let adultChildrenList = applicantsHistory && applicantsHistory.adult_children

    return (
      <div className='applicant_marital_history_cards'>
        <div id='ApplicantMaritalHistoryCardGroup' onClick={() => this.props.setFocusState('ApplicantMaritalHistoryCardGroup')}
          className={this.props.getFocusClassName('ApplicantMaritalHistoryCardGroup') + ' ' + 'card phone-section double-gap-top'}>
          <div className='card-header'>
            <span>Applicants Marital / Domestic Partnership History</span>
          </div>
          <div className='card-body'>
            {
              applicantMaritalHistories.map((applicantMaritalHistory, index) => {
                return (
                  <div key={'formerSpouse' + '[' + index + ']'} className='row list-item' >
                    <div> <span onClick={(event) => this.onMaritalHistoryClickClose(index)} className='pull-right glyphicon glyphicon-remove' />
                    </div>
                    { <ApplicantMaritalHistoryCard
                      index={index}
                      idPrefix={'applicantsHistory.former_spouses' + '[' + index + '].'}
                      applicants={this.props.applicants || []}
                      maritalHistory={applicantMaritalHistory}
                      validator={this.props.validator}
                      changeMaritalHistory={this.changeMaritalHistory}
                      handleRelationshipTypeToApplicant={this.handleRelationshipTypeToApplicantFormerSpouse}
                      setParentState={this.props.setParentState}
                      relationshipTypes={this.props.relationshipTypes}
                      suffixTypes={this.props.suffixTypes}
                      prefixTypes={this.props.prefixTypes}
                      nameTypes={this.props.nameTypes}
                      stateTypes={this.props.stateTypes}
                      marriageTerminationReasons={this.props.marriageTerminationReasons}
                      errors={this.props.errors.former_spouses[index]} /> }
                  </div>
                )
              })
            }
            <div className='text-center'>
              <button onClick={(event) => this.addMaritalHistoryCard(event, applicantMaritalHistories)} className='btn btn-default'>Add another Marital History +</button>
            </div>
          </div>
          <div className='card-header'>
            <span>Adult Children of All Applicants</span>
          </div>
          <div className='card-body'>
            {
              adultChildrenList.map((adultChild, index) => {
                return (

                  <div key={'adultChild' + '[' + index + ']'} className='row list-item' >
                    <div> <span onClick={() => this.onAdultChildClickClose(index)} className='pull-right glyphicon glyphicon-remove' />
                    </div>
                    { <AdultChildrenFields
                      index={index}
                      idPrefix={'applicantsHistory.adult_children' + '[' + index + '].'}
                      applicants={this.props.applicants || []}
                      adultChild={adultChild}
                      validator={this.props.validator}
                      changeAdultChild={this.changeAdultChild}
                      setParentState={this.props.setParentState}
                      changeAdultHistoryAddress={this.changeAdultHistoryAddress}
                      handleRelationshipTypeToApplicant={this.handleRelationshipTypeToApplicantAdultChild}
                      relationshipToApplicantTypes={this.props.relationshipToApplicantTypes}
                      suffixTypes={this.props.suffixTypes}
                      prefixTypes={this.props.prefixTypes}
                      nameTypes={this.props.nameTypes}
                      stateTypes={this.props.stateTypes} />}
                  </div>

                )
              })
            }
            <div className='text-center'>
              <button onClick={(event) => this.addAdultChildCard(event, adultChildrenList)} className='btn btn-default'>Add another Adult Child +</button>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

ApplicantMaritalHistoryCardGroup.defaultProps = {
  applicantsHistory: applicantsHistoryDefaults,
  former_spouses: [formerSpousesDefaults],
  adult_children: [adultChildrenDefaults],
  errors: {
    former_spouses: [],
    adult_children: []
  }
}
