import React from 'react'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import CompleteNameFields from './completeNameField'
import CommonAddressFields from 'components/rfa_forms/commonAddressField'
import PropTypes from 'prop-types'
import CleaveInputField from 'components/common/cleaveInputField.jsx'
import {fieldErrorsAsImmutableSet} from 'helpers/validationHelper.jsx'

const phoneNumberRule = {rule: 'is10digits', message: 'Invalid Phone Number'}

export default class ReferencesCard extends React.Component {
  constructor (props) {
    super(props)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.onSelection = this.onSelection.bind(this)

    this.props.validator.addFieldValidation(this.props.idPrefix + 'phone_number', phoneNumberRule)
  }
  handleAddressChange (key, value, referencesIndex) {
    let mailingAddressObj = Immutable.fromJS(this.props.reference.mailing_address)
    mailingAddressObj = mailingAddressObj.set(key, value)
    this.props.setParentState('mailing_address', mailingAddressObj.toJS(), referencesIndex)
  }
  onSelection (addressType, autofillData) {
    this.handleAddressChange()
  }
  render () {
    const phoneNumberId = this.props.idPrefix + 'phone_number'

    return (
      <div>
        <CompleteNameFields
          index={this.props.index}
          fieldValues={this.props.reference}
          suffixTypes={this.props.suffixTypes}
          prefixTypes={this.props.prefixTypes}
          onChange={this.props.setParentState} />
        <CommonAddressFields
          addressTitle='Physical Address'
          addressType={'Residential'}
          id="street_address"
          url='/geoservice/'
          validateUrl='/geoservice/validate'
          fieldName="street_address"
          index={this.props.index}
          stateTypes={this.props.stateTypes}
          onSelection={this.onSelection}
          addressFields={this.props.reference}
          onChange={this.handleAddressChange} />
        <CleaveInputField
          gridClassName='col-md-4'
          id={phoneNumberId}
          value={this.props.reference.phone_number}
          label='Phone Number'
          placeholder=''
          blurPlaceholder=''
          focusPlaceholder='(___)___-____'
          options={{
            delimiters: ['(', ')', '-'],
            blocks: [0, 3, 3, 4],
            numericOnly: true}}
          type='text'
          errors={fieldErrorsAsImmutableSet(this.props.errors.phone_number)}
          onChange={(event) => this.props.setParentState('phone_number', event.target.rawValue, this.props.index)}
          onBlur={(event) => this.props.validator.validateFieldSetErrorState(phoneNumberId, event.target.rawValue)} />
        <InputComponent gridClassName='col-md-4' id='email'
          value={this.props.reference.email}
          label='Email (optional)' placeholder=''
          type='text' onChange={(event) => this.props.setParentState('email',
            event.target.value, this.props.index)} />
      </div>
    )
  }
}

ReferencesCard.propTypes = {
  suffixTypes: PropTypes.array.isRequired,
  reference: PropTypes.object.isRequired,
  prefixTypes: PropTypes.array.isRequired,
  nameTypes: PropTypes.array.isRequired,
  stateTypes: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired
}

ReferencesCard.defaultProps = {
  idPrefix: '',
  errors: {}
}
