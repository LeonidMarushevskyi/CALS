import React from 'react'
import Immutable from 'immutable'
import {DropDownField} from '../common/dropDownField'
import {TextAreaComponent} from '../common/textArea'
import {yesNo} from '../constants/constants'
import {InputComponent} from '../common/inputFields'
import {getDictionaryId, dictionaryNilSelect} from '../helpers/commonHelper.jsx'

const othersUsingAddressMailing = Object.freeze({
  first_name: '',
  middle_name: '',
  last_name: ''
})

export default class AboutThisResidenceCard extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (key, value) {
    let othersMailing = Immutable.fromJS(this.props.aboutResidence.other_people_using_residence_as_mailing || [othersUsingAddressMailing])
    othersMailing = othersMailing.update(0, x => x.set(key, value))
    this.props.setParentState('other_people_using_residence_as_mailing', othersMailing.toJS())
  }

  render () {
    const aboutResidence = this.props.aboutResidence
    const othersMailing = aboutResidence.other_people_using_residence_as_mailing || [othersUsingAddressMailing]

    const hiddenBodyOfWater = aboutResidence.body_of_water_exist === 'true' ? '' : 'hidden'
    const hiddenUseAsMailingAddress = aboutResidence.others_using_residence_as_mailing === 'true' ? '' : 'hidden'

    return (
      <div className='card-body'>
        <div className='row'>
          <form>
            <DropDownField id='residenceTypes' gridClassName='col-md-7'
              selectClassName={'reusable-select'}
              value={getDictionaryId(aboutResidence.residence_ownership_type)}
              optionList={this.props.residenceTypes}
              label={'Do you own, rent or lease the residence?'}
              onChange={(event) => this.props.setParentState('residence_ownership_type', dictionaryNilSelect(event.target.selectedOptions[0]))} />
            <DropDownField id='weapons' gridClassName='col-md-7'
              selectClassName={'reusable-select'}
              text={aboutResidence.weapon_in_home}
              optionList={yesNo.items}
              label={'Weapons in home?'}
              onChange={(event) => this.props.setParentState('weapon_in_home', event.target.selectedOptions[0].value)} />

            <DropDownField id='body_of_water_exist' gridClassName='col-md-7'
              selectClassName={'reusable-select'}
              text={aboutResidence.body_of_water_exist}
              optionList={yesNo.items}
              label={'Body of Water?'}
              onChange={(event) => this.props.setParentState('body_of_water_exist', event.target.selectedOptions[0].value)} />

            <div className={hiddenBodyOfWater}>
              <TextAreaComponent gridClassName='col-md-12' id='body_of_water_description'
                value={aboutResidence.body_of_water_description}
                label='Please Describe the location of the body of water and its size.' placeholder=''
                onChange={(event) => this.props.setParentState('body_of_water_description', event.target.value)} />
            </div>

            <DropDownField id='others_using_residence_as_mailing' gridClassName='col-md-9'
              selectClassName={'reusable-select'}
              text={aboutResidence.others_using_residence_as_mailing}
              optionList={yesNo.items}
              label={'Does any person not listed in this document use the residence as their mailing address?'}
              onChange={(event) => this.props.setParentState('others_using_residence_as_mailing', event.target.selectedOptions[0].value)} />

            <div className={hiddenUseAsMailingAddress} >
              <InputComponent gridClassName='col-md-4' id='firstName' value={othersMailing[0]['first_name']}
                label='First Name' placeholder='Enter First Name'
                onChange={(event) => this.onChange('first_name', event.target.value)} />
              <InputComponent gridClassName='col-md-4' id='middleName' value={othersMailing[0]['middle_name']}
                label='Middle Name' placeholder='Enter Middle Name'
                onChange={(event) => this.onChange('middle_name', event.target.value)} />
              <InputComponent gridClassName='col-md-4' id='lastName' value={othersMailing[0]['last_name']}
                label='Last Name' placeholder='Enter Last Name'
                onChange={(event) => this.onChange('last_name', event.target.value)} />
            </div>

            <TextAreaComponent gridClassName='col-md-12' id='directions'
              value={aboutResidence.directions}
              optionList={this.props.directions}
              label='Please provide directions, including major cross-street information, to your residence.' placeholder=''
              onChange={(event) => this.props.setParentState('directions_to_home', event.target.value)} />

            <DropDownField id='languagesSpoken' gridClassName='col-md-12'
              selectClassName={'reusable-select'}
              value={getDictionaryId(aboutResidence.home_languages || '')}
              optionList={this.props.languageTypes}
              label={'Language(s) spoken in the home'}
              onChange={(event) => this.props.setParentState('home_languages', dictionaryNilSelect(event.target.selectedOptions[0]))} />
          </form>
        </div>
      </div>
    )
  }
}
