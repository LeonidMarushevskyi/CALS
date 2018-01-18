import React from 'react'
import {InnerBlockAddressTitles} from 'facility/innerBlockAddressTitles'
import {shallow} from 'enzyme'

describe('Verify innerBlockAddressDetails', () => {
  let innerBlockAddressDetailsShallow
  beforeEach(() => {
    innerBlockAddressDetailsShallow = shallow(<InnerBlockAddressTitles><br /></InnerBlockAddressTitles>)
  })
  it('test render', () => {
    expect(innerBlockAddressDetailsShallow.find('.small_inner_block').length).toEqual(1)
  })
})
