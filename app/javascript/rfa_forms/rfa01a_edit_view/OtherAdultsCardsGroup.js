import Immutable from 'immutable'
import React from 'react'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import {OtherAdultsCardField} from 'components/common/OtherAdultsCardField'
import {addCardAsJS, removeCardWithId, handleRelationshipTypeToApplicant, getFocusClassName} from 'helpers/cardsHelper.jsx'

export const otherAdultsDefaults = Object.freeze({
  relationship_to_applicants: [
    {
      applicant_id: '',
      relationship_to_applicant: null
    }
  ]
})

export default class OtherAdultsCardsGroup extends React.Component {
  constructor (props) {
    super(props)

    this.addCard = this.addCard.bind(this)
    this.handleRelationshipTypeToApplicant = this.handleRelationshipTypeToApplicant.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.clickClose = this.clickClose.bind(this)
  }

  addCard (event) {
    this.props.setParentState('otherAdults', addCardAsJS(this.props.otherAdults, otherAdultsDefaults))
  }

  clickClose (cardIndex) {
    this.props.setParentState('otherAdults',
      removeCardWithId(this.props.otherAdults, cardIndex, otherAdultsDefaults))
  }

  onFieldChange (cardIndex, value, type) {
    let otherAdultsList = Immutable.fromJS(this.props.otherAdults)
    otherAdultsList = otherAdultsList.update(cardIndex, x => x.set(type, value))
    this.props.setParentState('otherAdults', otherAdultsList.toJS())
  }

  handleRelationshipTypeToApplicant (index, value, type) {
    this.props.setParentState('otherAdults', handleRelationshipTypeToApplicant(index, value, type, checkArrayObjectPresence(this.props.otherAdults) || [otherAdultsDefaults]))
  }

  render () {
    let otherAdultsList = this.props.otherAdults
    return (
      <div className='other_adults_card'>
        <div id='otherAdultsSection' onClick={() => this.props.setFocusState('otherAdultsSection')}
          className={this.props.getFocusClassName('otherAdultsSection') + ' ' + 'card other-adults-section double-gap-top'}>
          <div className='card-header'>
            <span>Other Information</span>
          </div>
          <div className='card-body'>
            {
              otherAdultsList.map((otherAdultsFields, index) => {
                const idPrefix = 'otherAdults[' + index + '].'
                if (!otherAdultsFields.to_delete) {
                  return (
                    <div key={index} className='row list-item' >
                      <div > <a onClick={() => this.clickClose(index)} className='pull-right remove-btn'>Remove</a>
                      </div>
                      <OtherAdultsCardField
                        index={index}
                        idPrefix={idPrefix}
                        relationship_types={this.props.relationship_types}
                        otherAdults={otherAdultsFields}
                        applicants={this.props.applicants}
                        handleRelationshipTypeToApplicant={this.handleRelationshipTypeToApplicant}
                        clickClose={this.clickClose}
                        onFieldChange={this.onFieldChange}
                        validator={this.props.validator}
                        errors={this.props.errors[index]} />
                    </div>
                  )
                }
              })
            }
            <div className='text-center'>
              <button onClick={this.addCard} className='btn btn-default'>Add another Adult +</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OtherAdultsCardsGroup.defaultProps = {
  otherAdults: [otherAdultsDefaults],
  applicants: [],
  errors: []
}
