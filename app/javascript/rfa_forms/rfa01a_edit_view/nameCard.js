import React from 'react'
import {NameCardField} from 'components/common/nameCardField'
import Immutable from 'immutable'
import {InputComponent} from 'components/common/inputFields'
import {DropDownField} from 'components/common/dropDownField'
import CompleteNameFields from './completeNameField.jsx'
import {checkArrayObjectPresence, removeLegalNameType} from 'helpers/commonHelper.jsx'

const blankNameFields = Object.freeze({
  name_suffix: null,
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  name_type: null
})

export default class NameCard extends React.Component {
  constructor (props) {
    super(props)
    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
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
  addCard () {
    let nameCardsList = checkArrayObjectPresence(this.props.nameFields.other_names) || []
    nameCardsList.push(blankNameFields)
    this.props.setParentState('other_names', nameCardsList)
  }
  render () {
    let nameCardsList = checkArrayObjectPresence(this.props.nameFields.other_names)
    return (
      <div className='card-body'>
        <div className='row'>
          <CompleteNameFields
            fieldValues={this.props.nameFields}
            onChange={this.props.setParentState}
            nameTypes={this.props.nameTypes}
            suffixTypes={this.props.suffixTypes}
            prefixTypes={this.props.prefixTypes} />
        </div>
        {
          nameCardsList && this.props.nameFields.other_names.map((nameCardFields, index) => {
            return (
              <div key={index} className='row list-item'>
                <span onClick={(event) => this.removeCard(index)}
                  className='pull-right glyphicon glyphicon-remove' />
                <CompleteNameFields
                  index={index}
                  fieldValues={nameCardFields}
                  onChange={this.handleNameChange}
                  nameTypes={removeLegalNameType(this.props.nameTypes)}
                  suffixTypes={this.props.suffixTypes}
                  prefixTypes={this.props.prefixTypes}
                  showNameType />
              </div>
            )
          })
        }
        <div className='text-center'>
          <button onClick={this.addCard} className='btn btn-default'>Add another Name +</button>
        </div>
      </div>
    )
  }
}
