import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import {DropDownField} from 'components/common/dropDownField'
import CriminalFields from './criminalFields'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import CardLayout from 'components/common/cardLayout'
import Button from 'components/common/button'
import YesNoRadioComponent from 'components/common/yesNoFields'
import {Rfa01bOutsideCACriminalBackgroundCardText} from 'constants/rfaText'
import {disclosureDefaults} from 'constants/defaultFields'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'

export default class OutsideCACriminalBackground extends React.Component {
  constructor (props) {
    super(props)
    this.addCard = this.addCard.bind(this)
    this.clickClose = this.clickClose.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  addCard (event) {
    this.props.setParentState('convicted_in_another_state_disclosures', addCardAsJS(this.props.disclosures, disclosureDefaults))
  }
  clickClose (cardIndex) {
    this.props.setParentState('convicted_in_another_state_disclosures', removeCard(this.props.disclosures, cardIndex, disclosureDefaults))
  }

  onFieldChange (cardIndex, key, value) {
    let disclosures = Immutable.fromJS(this.props.disclosures)
    disclosures = disclosures.update(cardIndex, x => x.set(key, value))
    this.props.setParentState('convicted_in_another_state_disclosures', disclosures.toJS())
  }

  render () {
    const convictedInAnotherState = String(this.props.convictedInAnotherState)
    const disclosures = checkArrayObjectPresence(this.props.disclosures) || [disclosureDefaults]
    return (
      <CardLayout
        idClassName='outside_ca_criminal_background'
        id='OutsideCACriminalBackgroundCard'
        textAlignment='left'
        label='Disclosure of Criminal Background - Outside of California'
        handleOnClick={() => this.props.setFocusState('OutsideCACriminalBackgroundCard')}
        focusClassName={this.props.getFocusClassName('OutsideCACriminalBackgroundCard') + ' ' + 'card phone-section double-gap-top active-bar'}>
        <div>
          <div>{Rfa01bOutsideCACriminalBackgroundCardText.otherStateConviction}</div>
          <div>{Rfa01bOutsideCACriminalBackgroundCardText.californiaConviction}</div>
          <div>
            <YesNoRadioComponent
              idPrefix='outsideCACriminalBackground'
              value={convictedInAnotherState}
              onFieldChange={(event) => this.props.handleClearOnConditionalChange('convicted_in_another_state', event.target.value, 'convicted_in_another_state_disclosures', [disclosureDefaults])} />
          </div>
        </div>
        {convictedInAnotherState === 'true'
          ? disclosures.map((crime, index) => {
            return (
              <div key={'outsideCaliforniaCriminalBackground' + index}>
                <CriminalFields
                  index={index}
                  crime={crime}
                  idPrefix='outsideCaliforniaCriminalBackground'
                  clickClose={this.clickClose}
                  onFieldChange={this.onFieldChange} />
              </div>
            )
          })
          : null
        }
        {convictedInAnotherState === 'true'
          ? <div>
            <Button
              id='outsideCACrimeAdd'
              label='Add Another Offense - Outside of California +'
              onClick={this.addCard} />
          </div>
          : null }
      </CardLayout>
    )
  }
}

OutsideCACriminalBackground.propTypes = {
  convictedInAnotherState: PropTypes.any,
  disclosures: PropTypes.array,
  getFocusClassName: PropTypes.func,
  setFocusState: PropTypes.func,
  setParentState: PropTypes.func,
  handleClearOnConditionalChange: PropTypes.func,
  stateTypes: PropTypes.array,
  namePrefixTypes: PropTypes.array,
  nameSuffixTypes: PropTypes.array,
  errors: PropTypes.array
}
OutsideCACriminalBackground.defaultProps = {
  convictedInAnotherState: '',
  disclosures: [disclosureDefaults],
  errors: []
}
