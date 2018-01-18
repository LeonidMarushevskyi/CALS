import React from 'react'
import SearchInput from '../../../app/javascript/search/search_input'
import {shallow, mount} from 'enzyme'

describe('Render Search Inputs', function () {
  const props = {
    facilityTypes: [
      {
        id: '',
        value: ''
      }
    ],
    searchId: {
      userDetails: {
        county_name: 'Los Angeles'
      }
    },
    countyList: [
      {
        id: '',
        value: ''
      }
    ]

  }

  const searchInputComp = mount(<SearchInput {...props} />)

  it('verify component load', () => {
    expect(searchInputComp.length).toBe(1)
  })

  it('verify county select', () => {
    let countyField = searchInputComp.find('#county_select')
    spyOn(searchInputComp.instance(), 'handleChange').and.callThrough()
    countyField.simulate('change', {target: {options: {'19': {id: '19', value: 'Los Angeles'}, selectedIndex: 19}}})
    expect(searchInputComp.instance().handleChange).toHaveBeenCalledWith('countyValue', 'Los Angeles')
  })

  it('verify user logged in county', () => {
    let userCounty = searchInputComp.find('#county_select').props().value
    expect(userCounty).toBe('Los Angeles')
  })

  it('verify facilityTypes select', () => {
    let countyField = searchInputComp.find('#facility_select')
    spyOn(searchInputComp.instance(), 'handleChange').and.callThrough()
    countyField.simulate('change', {target: {options: {'2': {id: '400', value: 'Adoption Agency'}, selectedIndex: 2}}})
    expect(searchInputComp.instance().handleChange).toHaveBeenCalledWith('facilityTypeValue', 'Adoption Agency')
  })

  it('verify facility Id', () => {
    let countyField = searchInputComp.find('#facilityIdValue').hostNodes()
    spyOn(searchInputComp.instance(), 'handleChange').and.callThrough()
    countyField.simulate('change', {target: {value: 300665437}})
    expect(searchInputComp.instance().handleChange).toHaveBeenCalledWith('facilityIdValue', 300665437)
  })

  it('verify facility Id accepting alpha characters', () => {
    let countyField = searchInputComp.find('#facilityIdValue').hostNodes()
    spyOn(searchInputComp.instance(), 'handleChange').and.callThrough()
    countyField.simulate('change', {target: {value: 'DL7oFNL0AB'}})
    expect(searchInputComp.instance().handleChange).toHaveBeenCalledWith('facilityIdValue', 'DL7oFNL0AB')
  })

  it('verify facility Name', () => {
    let countyField = searchInputComp.find('#facilityNameValue').hostNodes()
    spyOn(searchInputComp.instance(), 'handleChange').and.callThrough()
    countyField.simulate('change', {target: {value: 'Lederhouse Transitions'}})
    expect(searchInputComp.instance().handleChange).toHaveBeenCalledWith('facilityNameValue', 'Lederhouse Transitions')
  })

  it('verify facility Address', () => {
    let countyField = searchInputComp.find('#facilityAddressValue').hostNodes()
    spyOn(searchInputComp.instance(), 'handleChange').and.callThrough()
    countyField.simulate('change', {target: {value: '36 Sequoia Dr,Aliso Viejo,CA 92656'}})
    expect(searchInputComp.instance().handleChange).toHaveBeenCalledWith('facilityAddressValue', '36 Sequoia Dr,Aliso Viejo,CA 92656')
  })
})
