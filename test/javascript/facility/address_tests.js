import React from 'react'
import FacilityAddress from '../../../app/javascript/facility/address.jsx'
import {shallow, mount} from 'enzyme'

describe('Verify Facility Address', function () {
  const props = {
    facilityData: {
      'last_visit_date': '2017-04-14',
      'last_visit_reason': {
        'id': '10',
        'value': 'CASELOAD MANAGEMENT'
      },
      'county': {
        'id': '30',
        'value': 'ORANGE'
      },
      'phones': [
        {
          'relation': 'primary',
          'type': 'Cell',
          'number': '9494480118'
        },
        {
          'relation': 'Alternative',
          'type': 'Cell',
          'number': '9454321234'
        }
      ],
      'addresses': [
        {
          'type': 'Residential',
          'address': {
            'street_address': '36 Sequoia Dr',
            'city': 'Aliso Viejo',
            'state': 'CA',
            'zip_code': '92656'
          }
        },
        {
          'type': 'Mailing',
          'address': {
            'street_address': '36 Sequoia Dr',
            'city': 'Aliso Viejo',
            'state': 'CA',
            'zip_code': '92656'
          }
        }
      ]
    }
  }
  let AddressCompShallow = shallow(<FacilityAddress {...props} />)
  it('verify Facility Address fields', function () {
    expect(AddressCompShallow.find('.facility-address').length).toEqual(1)
  })
  it('verify Facility Address street and apartment', function () {
    let physicalAddressStreetApt = AddressCompShallow.props().children.props.children[0].props.children.props.children[0].props.streetApt
    expect(physicalAddressStreetApt).toBe('36 Sequoia Dr,')
  })
  it('verify Facility Address city and country', function () {
    let physicalAddressCityCounty = AddressCompShallow.props().children.props.children[0].props.children.props.children[0].props.cityCountry
    expect(physicalAddressCityCounty).toBe('Aliso Viejo, CA 92656')
  })
  it('verify Facility Address county name', function () {
    let countyNameValue = AddressCompShallow.props().children.props.children[0].props.children.props.children[1].props.value
    expect(countyNameValue).toBe('ORANGE')
  })
  it('verify Facility Address primary phone number', function () {
    let primaryPhoneValue = AddressCompShallow.props().children.props.children[0].props.children.props.children[2].props.value
    expect(primaryPhoneValue).toBe('(949) 448-0118')
  })
  it('verify Postal Address street and apartment', function () {
    let postalAddressStreetApt = AddressCompShallow.props().children.props.children[1].props.children.props.children[0].props.streetApt
    expect(postalAddressStreetApt).toBe('36 Sequoia Dr,')
  })
  it('verify Postal Address city and country', function () {
    let postalAddressCityCounty = AddressCompShallow.props().children.props.children[1].props.children.props.children[0].props.cityCountry
    expect(postalAddressCityCounty).toBe('Aliso Viejo, CA 92656')
  })
  it('verify alternative phone number value', function () {
    let alternativeNumberValue = AddressCompShallow.props().children.props.children[1].props.children.props.children[1].props.value
    expect(alternativeNumberValue).toBe('(945) 432-1234')
  })
  it('verify Facility Last Visit Date Value', function () {
    let lastVisitDateValue = AddressCompShallow.props().children.props.children[2].props.children.props.children[0].props.value
    expect(lastVisitDateValue).toBe('2017-04-14')
  })
  it('verify Facility Last Visit Reason', function () {
    let lastVisitReasonValue = AddressCompShallow.props().children.props.children[2].props.children.props.children[1].props.value
    expect(lastVisitReasonValue).toBe('CASELOAD MANAGEMENT')
  })
})

describe('Verify Facility Address with null object returned', function () {
  const props = {
    facilityData: {
      'last_visit_date': null,
      'last_visit_reason': null,
      'county': null,
      'phones': null,
      'addresses': null
    }
  }
  let AddressCompShallow = shallow(<FacilityAddress {...props} />)
  it('verify Facility Address fields', function () {
    expect(AddressCompShallow.find('.facility-address').length).toEqual(1)
  })
  it('verify Facility Address street and apartment to be N/A', function () {
    let physicalAddressStreetApt = AddressCompShallow.props().children.props.children[0].props.children.props.children[0].props.streetApt
    expect(physicalAddressStreetApt).toBe('N/A')
  })
  it('verify Facility Address city and country to be N/A', function () {
    let physicalAddressCityCounty = AddressCompShallow.props().children.props.children[0].props.children.props.children[0].props.cityCountry
    expect(physicalAddressCityCounty).toBe('N/A')
  })
  it('verify Facility Address county name to be N/A', function () {
    let countyNameValue = AddressCompShallow.props().children.props.children[0].props.children.props.children[1].props.value
    expect(countyNameValue).toBe('N/A')
  })
  it('verify Facility Address primary phone number to be N/A', function () {
    let primaryPhoneValue = AddressCompShallow.props().children.props.children[0].props.children.props.children[2].props.value
    expect(primaryPhoneValue).toBe('N/A')
  })
  it('verify Postal Address street and apartment to be N/A', function () {
    let postalAddressStreetApt = AddressCompShallow.props().children.props.children[1].props.children.props.children[0].props.streetApt
    expect(postalAddressStreetApt).toBe('N/A')
  })
  it('verify Postal Address city and country to be N/A', function () {
    let postalAddressCityCounty = AddressCompShallow.props().children.props.children[1].props.children.props.children[0].props.cityCountry
    expect(postalAddressCityCounty).toBe('N/A')
  })
  it('verify alternative phone number value to be N/A', function () {
    let alternativeNumberValue = AddressCompShallow.props().children.props.children[1].props.children.props.children[1].props.value
    expect(alternativeNumberValue).toBe('N/A')
  })
  it('verify Facility Last Visit Date Value to be N/A', function () {
    let lastVisitDateValue = AddressCompShallow.props().children.props.children[2].props.children.props.children[0].props.value
    expect(lastVisitDateValue).toBe('N/A')
  })
  it('verify Facility Last Visit Reason to be N/A', function () {
    let lastVisitReasonValue = AddressCompShallow.props().children.props.children[2].props.children.props.children[1].props.value
    expect(lastVisitReasonValue).toBe('N/A')
  })
})

describe('Verify Facility Address with null values', function () {
  const props = {
    facilityData: {
      'last_visit_date': null,
      'last_visit_reason': {
        'id': '10',
        'value': null
      },
      'county': {
        'id': '30',
        'value': null
      },
      'phones': [
        {
          'relation': 'primary',
          'type': 'Cell',
          'number': null
        }
      ],
      'addresses': [
        {
          'type': 'Residential',
          'address': {
            'street_address': null,
            'city': null,
            'state': null,
            'zip_code': null
          }
        },
        {
          'type': 'Mailing',
          'address': {
            'street_address': null,
            'city': null,
            'state': null,
            'zip_code': null
          }
        }
      ]
    }
  }
  let AddressCompShallow = shallow(<FacilityAddress {...props} />)
  it('verify Facility Address fields', function () {
    expect(AddressCompShallow.find('.facility-address').length).toEqual(1)
  })
  it('verify Facility Address street and apartment to be N/A', function () {
    let physicalAddressStreetApt = AddressCompShallow.props().children.props.children[0].props.children.props.children[0].props.streetApt
    expect(physicalAddressStreetApt).toBe('N/A')
  })
  it('verify Facility Address city and state to be empty', function () {
    let physicalAddressCityCounty = AddressCompShallow.props().children.props.children[0].props.children.props.children[0].props.cityCountry
    expect(physicalAddressCityCounty).toBe('')
  })
  it('verify Facility Address county name to be N/A', function () {
    let countyNameValue = AddressCompShallow.props().children.props.children[0].props.children.props.children[1].props.value
    expect(countyNameValue).toBe('N/A')
  })
  it('verify Facility Address primary phone number to be N/A', function () {
    let primaryPhoneValue = AddressCompShallow.props().children.props.children[0].props.children.props.children[2].props.value
    expect(primaryPhoneValue).toBe('N/A')
  })
  it('verify Postal Address street and apartment to be N/A', function () {
    let postalAddressStreetApt = AddressCompShallow.props().children.props.children[1].props.children.props.children[0].props.streetApt
    expect(postalAddressStreetApt).toBe('N/A')
  })
  it('verify Postal Address city and country to be empty', function () {
    let postalAddressCityCounty = AddressCompShallow.props().children.props.children[1].props.children.props.children[0].props.cityCountry
    expect(postalAddressCityCounty).toBe('')
  })
  it('verify alternative phone number value to be N/A', function () {
    let alternativeNumberValue = AddressCompShallow.props().children.props.children[1].props.children.props.children[1].props.value
    expect(alternativeNumberValue).toBe('N/A')
  })
  it('verify Facility Last Visit Date Value to be N/A', function () {
    let lastVisitDateValue = AddressCompShallow.props().children.props.children[2].props.children.props.children[0].props.value
    expect(lastVisitDateValue).toBe('N/A')
  })
  it('verify Facility Last Visit Reason to be N/A', function () {
    let lastVisitReasonValue = AddressCompShallow.props().children.props.children[2].props.children.props.children[1].props.value
    expect(lastVisitReasonValue).toBe('N/A')
  })
})
