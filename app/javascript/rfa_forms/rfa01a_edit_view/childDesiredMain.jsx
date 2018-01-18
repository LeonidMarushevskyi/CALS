import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import ChildDesiredCard from './childDesiredCard'
import {getFocusClassName} from 'helpers/cardsHelper.jsx'

const blankValues = Object.freeze({
  child_identified: '',
  child_in_home: '',
  preferred_ages: [],
  preferred_sibling_group_up_to: null
})

export default class ChildDesiredMain extends React.Component {
  constructor (props) {
    super(props)
    this.setState = this.setState.bind(this)
  }

  setState (key, value) {
    let newData = Immutable.fromJS(this.props.childDesired)
    newData = newData.set(key, value)
    if (newData.toJS().child_identified === 'false') {
      newData = newData.set('child_in_home', '')
    }
    this.props.setParentState('childDesired', newData.toJS())
  }

  render () {
    let child = this.props.childDesired
    return (
      <div className='desired_child_card'>
        <div id='ChildDesiredMain' onClick={() => this.props.setFocusState('ChildDesiredMain')}
          className={this.props.getFocusClassName('ChildDesiredMain') + ' ' + 'card phone-section double-gap-top'}>
          <div className='card-header'><span>Information About the Child(ren)</span></div>
          <div className='card-body'>
            <div className='row'>
              <ChildDesiredCard
                desiredChildSection={child}
                ageGroups={this.props.ageGroups}
                siblingGroups={this.props.siblingGroups}
                setParentState={this.setState}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ChildDesiredMain.propTypes = {
  childDesired: PropTypes.object.isRequired,
  ageGroups: PropTypes.array.isRequired,
  siblingGroups: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired
}

ChildDesiredMain.defaultProps = {
  childDesired: blankValues
}
