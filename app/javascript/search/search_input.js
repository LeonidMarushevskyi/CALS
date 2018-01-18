import React from 'react'
import InputDataBlock from './common/inputDataBlock.js'
import {InputComponent} from 'components/common/inputFields'
import {dictionaryNilSelectValue} from 'helpers/commonHelper.jsx'
import {userDefaults} from 'constants/defaultFields.js'

export default class SearchInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchId: {
        countyValue: this.props.userDetails.county_name || userDefaults.county_name,
        facilityTypeValue: '',
        facilityIdValue: '',
        facilityNameValue: '',
        facilityAddressValue: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (key, value) {
    let newSearchId = this.state.searchId
    newSearchId[key] = value
    this.setState({
      searchId: newSearchId
    })
  }

  sendSearchInput (event) {
    event.preventDefault()
    const finalQuery = (this.state.searchId.countyValue + ',' + this.state.searchId.facilityTypeValue + ',' + this.state.searchId.facilityIdValue + ',' + this.state.searchId.facilityNameValue + ',' + this.state.searchId.facilityAddressValue)
    this.props.sendSearchInput(finalQuery)
  }
  render () {
    const facilityTypes = this.props.facilityTypes
    const countyList = this.props.countyList
    const facilityIterate = facilityTypes.map((facilityType) =>
      <option key={facilityType.id} id={facilityType.id} value={facilityType.value}>{facilityType.value}</option>
    )
    const countyIterate = countyList.map((county) =>
      <option key={county.id} id={county.id} value={county.value}>{county.value}</option>
    )
    return (
      <div className='search_input col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <form onSubmit={this.sendSearchInput.bind(this)}>
          <div className='field_input col-xs-12 col-sm-11 col-md-11 col-lg-11'>
            <div className='input_data col-xs-12 col-sm-2 col-md-2 col-lg-2'>
              <div>
                <span>County</span>
              </div>
              <div>
                <select className='searchSelect' id='county_select' value={this.state.searchId.countyValue} onChange={(event) => this.handleChange('countyValue', dictionaryNilSelectValue(event.target.options))}>
                  <option value=' ' />
                  {countyIterate}
                </select>
              </div>
            </div>
            <div className='input_data col-xs-12 col-sm-2 col-md-2 col-lg-2'>
              <div>
                <span>Facility Type</span>
              </div>
              <div>
                <select className='searchSelect' id='facility_select' value={this.state.searchId.facilityTypeValue} onChange={(event) => this.handleChange('facilityTypeValue', dictionaryNilSelectValue(event.target.options))}>
                  <option value='' />
                  {facilityIterate}
                </select>
              </div>
            </div>
            <InputDataBlock
              title='Facility ID #'
              columnWidth={2}>
              <InputComponent id='facilityIdValue'
                fieldClassName='form-control'
                value={this.state.searchId.facilityIdValue}
                placeholder='Enter Facility ID #'
                type='text'
                onChange={(event) => this.handleChange('facilityIdValue', event.target.value)} />
            </InputDataBlock>
            <InputDataBlock
              title='Facility Name'
              columnWidth={3}>
              <InputComponent id='facilityNameValue'
                fieldClassName='form-control'
                value={this.state.searchId.facilityNameValue}
                placeholder='Enter Facility Name'
                type='text'
                onChange={(event) => this.handleChange('facilityNameValue', event.target.value)} />
            </InputDataBlock>
            <InputDataBlock
              title='Facility Address'
              columnWidth={3}>
              <InputComponent id='facilityAddressValue'
                fieldClassName='form-control'
                value={this.state.searchId.facilityAddressValue}
                placeholder='Enter Facility Address'
                type='text'
                onChange={(event) => this.handleChange('facilityAddressValue', event.target.value)} />
            </InputDataBlock>
          </div>
          <div className='field_search col-xs-12 col-sm-1 col-md-1 col-lg-1'>
            <div className='search_block'>
              <button id='search' type='submit' className= 'btn btn-primary'>Search</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
SearchInput.defaultProps = {
  userDetails: userDefaults
}
