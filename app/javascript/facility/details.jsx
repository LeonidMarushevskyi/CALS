import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from './smallInnerBlockDetails.js'
import {checkForNA, checkValueForNull, checkforDateOrNa, checkNameorNA} from '../search/common/commonUtils'

export default class FacilityDetails extends React.Component {
  render () {
    const result = this.props.facilityData
    const licenseEffectiveDate = checkForNA(result.status) === ('Pending' || 'Probationary License') ? 'N/A' : (checkValueForNull(result.license_effective_date))
    return (
      <div className='facility-details grid_view col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div>
          <h1>
            {result.name}
          </h1>
          <div>
            <h3>
                      FACILITY TYPE : {' ' + checkForNA(result.type)}
            </h3>
          </div>
        </div>
        <div className='headliner col-xs-12 col-sm-12 col-md-12 col-lg-12' />
        <div className='facility_blocks col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                classNameTitle=''
                title='NAME OF LICENSEE/ PARENTS'
                value={result.licensee_name} />
              <SmallInnerBlockDetails
                classNameTitle=''
                title='APPROVAL/LICENSING WORKER'
                value={checkForNA(result.assigned_worker)} />
              <SmallInnerBlockDetails
                classNameTitle={''}
                title='ASSIGNED OVERSIGHT AGENCY'
                value={checkNameorNA(result.district_office)} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                classNameTitle=''
                title='FACILITY LICENSE NUMBER'
                value={result.license_number} />
              <SmallInnerBlockDetails
                classNameTitle=''
                title='LICENSE STATUS'
                value={checkForNA(result.status)} />
              <SmallInnerBlockDetails
                classNameTitle=''
                title='CAPACITY / CAPACITY LAST CHANGED'
                value={result.capacity + ' / ' + checkforDateOrNa(result.capacity_last_changed)} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
            <div className='inner_block'>
              <SmallInnerBlockDetails
                classNameTitle=''
                title='LICENSE EFFECTIVE DATE'
                value={licenseEffectiveDate} />
              <SmallInnerBlockDetails
                classNameTitle=''
                title='APPLICATION RECEIVED DATE'
                value={checkValueForNull(result.original_application_recieved_date)} />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

FacilityDetails.propTypes = {
  facilityData: PropTypes.object.isRequired
}

FacilityDetails.defaultProps = {
  facilityData: {}
}
