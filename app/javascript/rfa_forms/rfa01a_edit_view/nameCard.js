import React from 'react'
import PropTypes from 'prop-types'
import {NameCardField} from 'components/common/nameCardField'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import CompleteNameFields from './completeNameField.jsx'
import {checkArrayObjectPresence, removeLegalNameType} from 'helpers/commonHelper.jsx'
import {addCardAsJS, removeCard} from 'helpers/cardsHelper.jsx'

const blankNameFields = Object.freeze({
  name_suffix: null,
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_type: null
})

const requiredNameRule = {rule: 'isRequired', message: 'Required'}

export default class NameCard extends React.Component {
  constructor (props) {
    super(props)
    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)

    this.props.validator.addFieldValidation(this.props.idPrefix + 'first_name', requiredNameRule)
    this.props.validator.addFieldValidation(this.props.idPrefix + 'last_name', requiredNameRule)
  }

  addCard (event) {
    this.props.setParentState('other_names', addCardAsJS(this.props.nameFields.other_names, blankNameFields))
  }

  removeCard (indexValue) {
    let nameCardsList = Immutable.fromJS(this.props.nameFields.other_names)
    nameCardsList = nameCardsList.delete(indexValue)
    this.props.setParentState('other_names', nameCardsList.toJS())
  }

  handleNameChange (key, value, nameIndex) {
    let otherNameList = Immutable.fromJS(this.props.nameFields.other_names)

    otherNameList = otherNameList.update(nameIndex, x => x.set(key, value))
    this.props.setParentState('other_names', otherNameList.toJS())
  }

  render () {
    let nameFields = this.props.nameFields
    let nameCardsList = nameFields.other_names
    return (
      <div className='card-body'>
        <div className='row'>
          <CompleteNameFields
            namePrefixId='name_prefix'
            nameSuffixId='name_suffix'
            firstNameId='first_name'
            middleNameId='middle_name'
            lastNameId='last_name'
            firstName={nameFields.first_name}
            middleName={nameFields.middle_name}
            lastName={nameFields.last_name}
            nameSuffix={nameFields.name_suffix}
            namePrefix={nameFields.name_prefix}
            onChange={this.props.setParentState}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes}
            hideNameType
            validator={this.props.validator}
            errors={this.props.errors} />
        </div>
        {
          nameCardsList && this.props.nameFields.other_names.map((nameCardFields, index) => {
            return (
              <div key={index} className='row list-item'>
                <a onClick={(event) => this.removeCard(index)}
                  className='pull-right remove-btn'>Remove</a>
                <CompleteNameFields
                  index={index}
                  namePrefixId='name_prefix'
                  nameSuffixId='name_suffix'
                  nameTypeId='name_type'
                  firstNameId='first_name'
                  middleNameId='middle_name'
                  lastNameId='last_name'
                  firstName={nameCardFields.first_name}
                  middleName={nameCardFields.middle_name}
                  lastName={nameCardFields.last_name}
                  nameSuffix={nameCardFields.name_suffix}
                  namePrefix={nameCardFields.name_prefix}
                  nameType={nameCardFields.name_type}
                  onChange={this.handleNameChange}
                  nameTypes={removeLegalNameType(this.props.nameTypes)}
                  suffixTypes={this.props.suffixTypes}
                  prefixTypes={this.props.prefixTypes}
                  hideNameType={false} />
              </div>
            )
          })
        }
        <div className='text-center'>
          <button disabled={this.props.hasValidName} onClick={this.addCard} className='btn btn-default'>Add Alias +</button>
        </div>
      </div>
    )
  }
}

NameCard.propTypes = {
  idPrefix: PropTypes.string,
  nameTypes: PropTypes.array.isRequired,
  nameFields: PropTypes.object,
  setParentState: PropTypes.func.isRequired
}

NameCard.defaultProps = {
  nameFields: blankNameFields
}
