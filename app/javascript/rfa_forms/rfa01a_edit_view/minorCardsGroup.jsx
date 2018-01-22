import Immutable from 'immutable'
import React from 'react'
import PropTypes from 'prop-types'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import {MinorCardField} from './minorCardField'
import {addCardAsJS, removeCardWithId, handleRelationshipTypeToApplicant, getFocusClassName} from 'helpers/cardsHelper.jsx'

export const minorDefaults = Object.freeze({
  relationship_to_applicants: [
    {
      applicant_id: '',
      relationship_to_applicant: null
    }
  ],
  child_adopted: '',
  child_financially_supported: ''
})

export default class MinorCardsGroup extends React.Component {
  constructor (props) {
    super(props)

    this.addCard = this.addCard.bind(this)
    this.handleRelationshipTypeToApplicant = this.handleRelationshipTypeToApplicant.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.clickClose = this.clickClose.bind(this)
  }

  addCard (event) {
    this.props.setParentState('minorChildren', addCardAsJS(this.props.minorChildren, minorDefaults))
  }

  clickClose (cardIndex) {
    this.props.setParentState('minorChildren',
      removeCardWithId(this.props.minorChildren, cardIndex, minorDefaults))
  }

  onFieldChange (cardIndex, value, type) {
    let minorChildrenList = Immutable.fromJS(this.props.minorChildren)
    minorChildrenList = minorChildrenList.update(cardIndex, x => x.set(type, value))
    this.props.setParentState('minorChildren', minorChildrenList.toJS())
  }

  handleRelationshipTypeToApplicant (index, value, type) {
    this.props.setParentState('minorChildren', handleRelationshipTypeToApplicant(index, value, type, this.props.minorChildren))
  }

  render () {
    let minorChildrenList = this.props.minorChildren

    return (
      <div className='minor_card'>
        <div id='minorsSection' onClick={() => this.props.setFocusState('minorsSection')}
          className={this.props.getFocusClassName('minorsSection') + ' ' + 'card minors-section double-gap-top active-bar'}>
          <div className='card-header'>
            <span>Other Information</span>
          </div>
          <div className='card-body'>
            {
              minorChildrenList.map((minor, index) => {
                const idPrefix = 'minorChildren[' + index + '].'
                if (!minor.to_delete) {
                  return (
                    <div key={index} className='row list-item' >
                      <div> <a onClick={() => this.clickClose(index)} className='pull-right remove-btn'>Remove</a>
                      </div>
                      <MinorCardField
                        index={index}
                        idPrefix={idPrefix}
                        genderTypes={this.props.genderTypes}
                        relationshipToApplicantTypes={this.props.relationshipToApplicantTypes}
                        minorChild={minor}
                        handleRelationshipTypeToApplicant={this.handleRelationshipTypeToApplicant}
                        applicants={this.props.applicants}
                        onFieldChange={this.onFieldChange}
                        validator={this.props.validator}
                        errors={this.props.errors[index]} />
                    </div>
                  )
                }
              })
            }
            <div className='text-center'>
              <button onClick={this.addCard} className='btn btn-default'>Add another minor +</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MinorCardsGroup.propTypes = {
  minorChildren: PropTypes.array.isRequired,
  applicants: PropTypes.array.isRequired

}

MinorCardsGroup.defaultProps = {
  minorChildren: [minorDefaults],
  applicants: [],
  errors: []
}
