import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {SmallInnerBlockAddress} from './smallInnerBlockAddress.js'

export const addressDefaults = Object.freeze({
  street_address: '',
  zip: '',
  city: '',
  state: null,
  type: null
})

export const phoneDefaults = Object.freeze({
  relation: '',
  type: '',
  number: ''
})

export const facilityDataDefaults = Object.freeze({
  addresses: [addressDefaults],
  phones: [phoneDefaults]
})

export default class FacilityAddress extends React.Component {
  render () {
    let result = this.props.facilityData
    let resultAddr = this.props.facilityData.addresses
    let createPhoneNumber = this.props.facilityData.phones[0].number.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
    let resAddress = resultAddr[0].address.city + ',' + ' ' + resultAddr[0].address.state + ' ' + resultAddr[0].address.zip_code
    let mailAddress = resultAddr[1].address.city + ',' + ' ' + resultAddr[1].address.state + ' ' + resultAddr[1].address.zip_code
    let lastVisitDate = result.last_visit_date == null ? 'N/A' : result.last_visit_date
    let VisitReason = result.last_visit_reason == null ? 'N/A' : result.last_visit_reason.value
    // let phoneFormat = resultPhn[0] !== undefined ? resultPhn[0].number.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3') : 'N/A'
    // let resStreetAddr = resultAddr[0] !== undefined ? resultAddr[0].address.street_address : 'N/A'
    // let resAddress = resultAddr[0] !== undefined ? resultAddr[0].address.city + ',' + ' ' + resultAddr[0].address.state + ' ' + resultAddr[0].address.zip_code : 'N/A'
    // let mailStreetAddr = resultAddr[1] !== undefined ? resultAddr[1].address.street_address : 'N/A'
    return (
      <div className='facility-address col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className='facility-address-block col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='facility-address-details col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockAddress
                classNameTitle={''}
                title={'PHYSICAL ADDRESS'}
                streetApt={resultAddr[0].address.street_address}
                cityCountry={resAddress} />
              <SmallInnerBlockDetails
                classNameTitle={''}
                title={'COUNTY NAME'}
                value={result.county.value} />
              <div>
                <SmallInnerBlockDetails
                  classNameTitle={'phone_primary'}
                  title={'PRIMARY PHONE'}
                  value={createPhoneNumber} />
                <SmallInnerBlockDetails
                  classNameTitle='phone_alt'
                  title='ALTERNATIVE PHONE'
                  value='N/A' />
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockAddress
                classNameTitle={'postal_address'}
                title={'POSTAL ADDRESS'}
                streetApt={resultAddr[1].address.street_address}
                cityCountry={mailAddress} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                classNameTitle={'last_visit'}
                title={'LAST VISIT DATE'}
                value={lastVisitDate} />
              <SmallInnerBlockDetails
                classNameTitle={'visit_reason'}
                title='LAST VISIT REASON'
                value={VisitReason} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FacilityAddress.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityAddress.defaultProps = {
  facilityData: facilityDataDefaults
}
