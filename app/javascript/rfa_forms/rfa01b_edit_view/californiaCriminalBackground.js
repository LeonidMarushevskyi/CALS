import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import CriminalFields from './criminalFields'
import {DropDownField} from 'components/common/dropDownField'
import YesNoRadioComponent from 'components/common/yesNoFields'

import CardLayout from 'components/common/cardLayout'
import Button from 'components/common/button'
import {Rfa01bCaliforniaCriminalBackGroundCardText} from 'constants/rfaText'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'

const disclosureDefaults = Object.freeze({
  'offense': '',
  'offense_city': '',
  'offense_state': {
    value: 'California',
    id: 'CA'},
  'offense_date': '',
  'when_offense_happen': '',
  'offense_details': ''
})

export default class CaliforniaCriminalBackground extends React.Component {
  constructor (props) {
    super(props)
    this.addCard = this.addCard.bind(this)
    this.clickClose = this.clickClose.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  addCard (event) {
    this.props.setParentState('convicted_in_california_disclosures', addCardAsJS(this.props.disclosures, disclosureDefaults))
  }
  clickClose (cardIndex) {
    this.props.setParentState('convicted_in_california_disclosures', removeCard(this.props.disclosures, cardIndex, disclosureDefaults))
  }

  onFieldChange (cardIndex, key, value) {
    let disclosures = Immutable.fromJS(this.props.disclosures)
    disclosures = disclosures.update(cardIndex, x => x.set(key, value))
    this.props.setParentState('convicted_in_california_disclosures', disclosures.toJS())
  }

  render () {
    const convictedInCalifornia = String(this.props.convictedInCalifornia)
    const disclosures = checkArrayObjectPresence(this.props.disclosures) || [disclosureDefaults]
    return (

      <CardLayout
        idClassName='ca_criminal_background'
        id='CACriminalBackgroundCard'
        textAlignment='left'
        label='Disclosure of Criminal Background - California (only)'
        handleOnClick={() => this.props.setFocusState('CACriminalBackgroundCard')}
        focusClassName={this.props.getFocusClassName('CACriminalBackgroundCard') + ' ' + 'card phone-section double-gap-top active-bar'}>
        <div>
          <div>{Rfa01bCaliforniaCriminalBackGroundCardText.convicted}</div>
          <div>{Rfa01bCaliforniaCriminalBackGroundCardText.marijuana}</div>
          <div>
            <YesNoRadioComponent
              idPrefix='californiaCriminalBackgroundRadio'
              value={convictedInCalifornia}
              onFieldChange={(event) => this.props.handleClearOnConditionalChange('convicted_in_california', event.target.value, 'convicted_in_california_disclosures', [disclosureDefaults])} />

          </div>
        </div>
        {convictedInCalifornia === 'true'
          ? disclosures.map((crime, index) => {
            return (
              <div key={'californiaCriminalBackgroundKey' + index}>
                <CriminalFields
                  index={index}
                  crime={crime}
                  idPrefix='californiaCriminalBackground'
                  clickClose={this.clickClose}
                  onFieldChange={this.onFieldChange} />
              </div>
            )
          })
          : null
        }

        {convictedInCalifornia === 'true'
          ? <div>
            <Button
              id='CACrimeAdd'
              label='Add Another Offense - California (only) +'
              onClick={this.addCard} />
          </div>
          : null }

      </CardLayout>
    )
  }
}

CaliforniaCriminalBackground.propTypes = {
  convictedInCalifornia: PropTypes.any,
  getFocusClassName: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func,
  handleClearOnConditionalChange: PropTypes.func,
  stateTypes: PropTypes.array,
  namePrefixTypes: PropTypes.array,
  nameSuffixTypes: PropTypes.array,
  errors: PropTypes.array
}

CaliforniaCriminalBackground.defaultProps = {
  convictedInCalifornia: '',
  disclosures: [disclosureDefaults],
  errors: []
}
