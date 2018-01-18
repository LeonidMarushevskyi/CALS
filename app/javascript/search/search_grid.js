import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'
import GridInnerLayout from './common/gridInnerLayout.js'
import GridOuterLayout from './common/gridOuterLayout.js'
import {checkForNA, checkValueForNull, respectiveNumberOrNA, respectiveFullAddressOrNA,
  primaryPhoneRelation, alternativePhoneRelation, physicalAddressType} from './common/commonUtils'

export default class SearchGrid extends React.Component {
  render () {
    const searchResults = this.props.searchResults
    const gridResult = searchResults.map((result, index) => {
      return (
        <div key={index} className='grid_view_inner col-xs-12 col-sm-12 col-md-12 col-lg-12' >
          <div className='col-xs-12 col-sm-1 col-md-1 col-lg-1'>
            <a href={urlPrefixHelper('/facilities/' + result.id)}><div className='home-icon' /></a>
          </div>
          <div className='col-xs-12 col-sm-11 col-md-11 col-lg-11'>
            <GridOuterLayout>
              <div>
                <p className='block_label'>Facility Name </p>
                <p className='block_text'>
                  <a href={urlPrefixHelper('/facilities/' + result.id)}>{result.name}</a>
                </p>
              </div>
              <GridInnerLayout
                title='Facility ID/Approval #'
                value={result.license_number} />
              <GridInnerLayout
                title='Facility Type'
                value={checkForNA(result.type)} />
              <GridInnerLayout
                title='Facility Source'
                value={checkValueForNull(result.facility_source)} />
              <GridInnerLayout
                title='Status'
                value={checkForNA(result.status)} />
            </GridOuterLayout>
            <GridOuterLayout>
              <GridInnerLayout
                title='Facility Address'
                value = {respectiveFullAddressOrNA(result.addresses, physicalAddressType)} />
              <GridInnerLayout
                title='County'
                value={checkForNA(result.county)} />
              <GridInnerLayout
                title='Facility Phone Number'
                value={respectiveNumberOrNA(result.phones, primaryPhoneRelation)} />
              <GridInnerLayout
                title='Facility Email'
                value={checkForNA(result.email_address)} />
              <GridInnerLayout
                title='Licensee Name'
                value={result.name} />
            </GridOuterLayout>
            <GridOuterLayout>
              <GridInnerLayout
                title='Assigned Worker'
                value={checkForNA(result.assigned_worker)} />
              <GridInnerLayout
                title='Alternative Number'
                value={respectiveNumberOrNA(result.phones, alternativePhoneRelation)} />
            </GridOuterLayout>
          </div>
        </div>
      )
    })
    return (
      <div className='grid_view col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        {gridResult}
      </div>
    )
  }
}

SearchGrid.propTypes = {
  searchResults: PropTypes.array.isRequired
}

SearchGrid.defaultProps = {
  searchResults: []
}
