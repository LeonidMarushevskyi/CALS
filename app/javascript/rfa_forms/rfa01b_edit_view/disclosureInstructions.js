import React from 'react'
import PropTypes from 'prop-types'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import CardLayout from 'components/common/cardLayout'
import {Rfa01bDisclosureInstructions, toggleInstructionStyle} from 'constants/rfaText'
export default class DisclosureInstructions extends React.Component {
  render () {
    const disclosureList = Rfa01bDisclosureInstructions.disclosureInstructions_array.map((element, index) =>
      <li key={index}>
        {element}
      </li>
    )
    return (
      <CardLayout
        idClassName='disclosure_instructions'
        id='DisclosureInstructionsCard'
        textAlignment='left'
        label='Disclosure Instructions (Must read before section II is completed)'
        handleOnClick={() => this.props.setFocusState('DisclosureInstructionsCard')}
        focusClassName={this.props.getFocusClassName('DisclosureInstructionsCard') + ' ' + 'card phone-section double-gap-top active-bar'}
        showHeaderLink
        headerToggleId='disclosureInstructionsToggle'
        headerDisplayLink={this.props.disclosureInstructionsDisplay}
        onHeaderToggleClick={() => this.props.setDisplayState('disclosureInstructionsDisplay',
          !this.props.disclosureInstructionsDisplay)}>
        <div>
          {
            this.props.disclosureInstructionsDisplay
              ? <div className='row list-item'>
                <div> {Rfa01bDisclosureInstructions.disclosure_instructions_start}</div>
                <div> {Rfa01bDisclosureInstructions.disclosure_instructions_if}</div>
                <div>{ <ul>{ disclosureList }</ul>}</div>
                <div> {Rfa01bDisclosureInstructions.disclosureInstructions_note}</div>
              </div>
              : null
          }
        </div>
      </CardLayout>
    )
  }
}
DisclosureInstructions.propTypes = {
  focusComponentName: PropTypes.string,
  getFocusClassName: PropTypes.func,
  disclosureInstructionsDisplay: PropTypes.bool,
  setDisplayState: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func
}

DisclosureInstructions.defaultProps = {
  disclosureInstructionsDisplay: false,
  errors: []
}
