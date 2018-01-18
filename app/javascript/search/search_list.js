import React from 'react'
import PropTypes from 'prop-types'
import {urlPrefixHelper} from '../helpers/url_prefix_helper.js.erb'
import {checkForNA, checkValueForNull, respectiveFullAddressOrNA, respectiveNumberOrNA,
  primaryPhoneRelation, alternativePhoneRelation, physicalAddressType} from './common/commonUtils'

export default class SearchList extends React.Component {
  render () {
    const searchResult = this.props.searchResults
    const resultTable = searchResult.map((result, index) => {
      return (
        <tr key={index}>
          <td><a href={urlPrefixHelper('/facilities/' + result.id)}>{result.name}</a></td>
          <td>{result.license_number}</td>
          <td>{checkForNA(result.type) + ' / ' + checkValueForNull(result.facility_source)}</td>
          <td>{checkForNA(result.status)}</td>
          <td>{result.name}</td>
          <td>{respectiveFullAddressOrNA(result.addresses, physicalAddressType)}</td>
          <td>{result.county.value}</td>
          <td>{respectiveNumberOrNA(result.phones, primaryPhoneRelation)}</td>
          <td>{checkForNA(result.email_address)}</td>
          <td>{checkForNA(result.assigned_worker)}</td>
          <td>{respectiveNumberOrNA(result.phones, alternativePhoneRelation)}</td>
        </tr>
      )
    })
    return (
      <div className='main_table'>
        <table className='table'>
          <thead>
            <tr>
              <th>Facility Name </th>
              <th>Facility license / Approval #</th>
              <th>Facility Type / Facility Source</th>
              <th>Status</th>
              <th>Licensee Name</th>
              <th>Facility Address</th>
              <th>County</th>
              <th>Phone Number</th>
              <th>Facility Email</th>
              <th>Assigned Worker</th>
              <th>Alternative Number</th>
            </tr>
          </thead>
          <tbody>
            {resultTable}
          </tbody>
        </table>
      </div>
    )
  }
}

SearchList.propTypes = {
  searchResults: PropTypes.array.isRequired
}

SearchList.defaultProps = {
  searchResults: []
}
