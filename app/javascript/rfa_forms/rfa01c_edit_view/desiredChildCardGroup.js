import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import DesiredChildCard from 'rfa_forms/rfa01c_edit_view/desiredChildCard'
import CardLayout from 'components/common/cardLayout'
import Button from 'components/common/button'
import {blankIdentifiedChild} from 'constants/defaultFields'

import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'

export default class DesiredChildCardGroup extends React.Component {
  constructor (props) {
    super(props)
    this.addCard = this.addCard.bind(this)
    this.clickClose = this.clickClose.bind(this)
    this.setApplicationNestedState = this.setApplicationNestedState.bind(this)
  }

  addCard (event) {
    this.props.setParentState('identified_children', addCardAsJS(this.props.identifiedChildren, blankIdentifiedChild))
  }

  clickClose (cardIndex) {
    this.props.setParentState('identified_children',
      removeCard(this.props.identifiedChildren, cardIndex, blankIdentifiedChild))
  }

  setApplicationNestedState (cardIndex, key, value) {
    let identifiedChildren = Immutable.fromJS(this.props.identifiedChildren)
    identifiedChildren = identifiedChildren.update(cardIndex, x => x.set(key, value))
    this.props.setParentState('identified_children', identifiedChildren.toJS())
  }

  render () {
    return (
      <CardLayout
        idClassName='desired_child_card'
        id='DesiredChildSection'
        textAlignment='left'
        label='Child Identification'
        handleOnClick={() => this.props.setFocusState('ChildDesiredMain')}
        focusClassName={this.props.getFocusClassName('ChildDesiredMain') + ' ' + 'card phone-section double-gap-top active-bar'}>
        {
          this.props.identifiedChildren.map((child, index) => {
            return (
              <div key={'desiredChildCard' + index} className='row'>
                <DesiredChildCard
                  index={index}
                  idPrefix={'desiredChild[' + index + '].'}
                  setParentState={this.setApplicationNestedState}
                  desiredChild={child}
                  applicants={this.props.applicants}
                  genderTypes={this.props.genderTypes}
                  suffixTypes={this.props.suffixTypes}
                  countyTypes={this.props.countyTypes}
                  stateTypes={this.props.stateTypes}
                  validator={this.props.validator}
                  errors={this.props.errors}
                  clickClose={this.clickClose}
                  addCard={this.addCard}
                  schoolGrades={this.props.schoolGrades} />
              </div>
            )
          })
        }
        { <div className='row'>
          <Button
            id='addDesiredChildCardButton'
            label='Add another child +'
            onClick={this.addCard} />
        </div> }
      </CardLayout>
    )
  }
}

DesiredChildCardGroup.propTypes = {
  identifiedChildren: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired,
  schoolGrades: PropTypes.array.isRequired,
  countyTypes: PropTypes.array.isRequired,
  suffixTypes: PropTypes.array.isRequired
}

DesiredChildCardGroup.defaultProps = {
  identifiedChildren: [blankIdentifiedChild]
}
