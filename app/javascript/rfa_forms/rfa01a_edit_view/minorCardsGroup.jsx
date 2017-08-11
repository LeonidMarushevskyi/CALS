import Immutable from 'immutable'
import React from 'react'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import {MinorCardField} from './minorCardField'
import {setToWhom} from 'helpers/cardsHelper.jsx'

export const minorDefaults = Object.freeze({
  'relationship_to_applicants': [
    {
      'applicant_id': 0,
      'relationship_to_applicant': {}
    }
  ],
//  'date_of_birth': '',
  'gender': {},
  'child_financially_supported': '',
  'child_adopted': ''
})

export default class MinorCardsGroup extends React.Component {
  constructor (props) {
    super(props)

    this.addCard = this.addCard.bind(this)
  //  this.handleNameFieldInput = this.handleNameFieldInput.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.clickClose = this.clickClose.bind(this)
  }

  addCard (event) {
    let minorList = checkArrayObjectPresence(this.props.minorChildren) || [minorDefaults]
    minorList.push(minorDefaults)
    this.props.setParentState('minorChildren', minorList)
  }

  clickClose (cardIndex) {
    let minorChildren = Immutable.fromJS(checkArrayObjectPresence(this.props.minorChildren) || [minorDefaults])

    minorChildren = minorChildren.delete(cardIndex)
    if (minorChildren.size === 0) {
      minorChildren = minorChildren.push(minorDefaults)
    }
    this.props.setParentState('minorChildren', minorChildren.toJS())
  }

  onFieldChange (cardIndex, value, type) {
    let minorChildrenList = Immutable.fromJS(checkArrayObjectPresence(this.props.minorChildren) || [minorDefaults])
    minorChildrenList = minorChildrenList.update(cardIndex, x => x.set(type, value))
    this.props.setParentState('minorChildren', minorChildrenList.toJS())
  }

  getFocusClassName (componentName) {
    return this.props.focusComponentName === componentName ? 'edit' : 'show'
  }

  render () {
    let minorChildrenList = checkArrayObjectPresence(this.props.minorChildren.items) || [minorDefaults]

    return (
      <div className='minor_card'>

        <div id='minorsSection' onClick={() => this.props.setFocusState('minorsSection')}
          className={this.getFocusClassName('minorsSection') + ' ' + 'card minors-section double-gap-top'}>

          <div className='card-header'>
            <span>Other Information</span>
          </div>
          <div className='card-body'>
            {
              minorChildrenList.map((minor, index) => {
                return (
                  <div key={index} className='row list-item' >
                    <div> <span onClick={() => this.clickClose(index)} className='pull-right glyphicon glyphicon-remove' />
                    </div>
                    <MinorCardField
                      index={index}
                      genderTypes={this.props.genderTypes}
                      relationshipToApplicantTypes={this.props.relationshipToApplicantTypes}
                      minorChild={minor}
                      applicants={this.props.applicants}
                      setToWhom={setToWhom}
                      handleNameFieldInput={this.handleNameFieldInput}
                      clickClose={this.clickClose}
                      onFieldChange={this.onFieldChange} />
                  </div>

                )
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

MinorCardsGroup.defaultProps = {
  applicants: []
}
