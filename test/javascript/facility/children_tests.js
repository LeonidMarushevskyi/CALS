import React from 'react'
import Children from '../../../app/javascript/facility/children.jsx'
import {mount} from 'enzyme'

describe('Verify Children Component', function () {
  const props = {
    facilityData: {
      'count': 3,
      'children': [{
        'id': 2222,
        'person': {
          'age': 17,
          'date_of_birth': '2000-05-28',
          'first_name': 'Mei',
          'gender': 'F',
          'last_name': 'Takahashi'
        },
        'date_of_placement': '01/02/2003',
        'assigned_worker': {
          'first_name': 'Peter',
          'last_name': 'Parker'
        },
        'county_of_origin': 'sacramento'
      }]}
  }
  const renderChildComp = mount(<Children {...props} />)
  it('Verify Children table', () => {
    expect(renderChildComp.length).toBe(1)
  })
  it('Verify ID', () => {
    expect(renderChildComp.find('td[data-label="id"]').props().children[1]).toBe(2222)
  })
  it('Verify child first name', () => {
    expect(renderChildComp.find('td[data-label="first name"]').props().children[1]).toBe('Mei')
  })
  it('Verify child last name', () => {
    expect(renderChildComp.find('td[data-label="last name"]').props().children[1]).toBe('Takahashi')
  })
  it('Verify child gender', () => {
    expect(renderChildComp.find('td[data-label="sex"]').props().children[1]).toBe('F')
  })
  it('Verify child age', () => {
    expect(renderChildComp.find('td[data-label="age"]').props().children[1]).toBe(17)
  })
  it('Verify date of birth', () => {
    expect(renderChildComp.find('td[data-label="date of birth"]').props().children[1]).toBe('2000-05-28')
  })
  it('Verify date of placement', () => {
    expect(renderChildComp.find('td[data-label="date of placement"]').props().children[1]).toBe('01/02/2003')
  })
  it('Verify assigned worker full name', () => {
    expect(renderChildComp.find('td[data-label="assigned worker"]').props().children[1]).toBe('Peter Parker')
  })
  it('Verify child county of origin', () => {
    expect(renderChildComp.find('td[data-label="county of origin"]').props().children[1]).toBe('sacramento')
  })
})
