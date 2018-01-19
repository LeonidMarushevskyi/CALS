import React from 'react'
import {shallow, mount} from 'enzyme'
import ChildDesiredMain from 'rfa_forms/rfa01a_edit_view/childDesiredMain.jsx'
import {siblingGroups, ageGroups} from './../../helpers/constants'

describe('Verify Child Desired Component', () => {
  let childDesiredComp, setParentStateSpy, getFocusClassNameSpy, setFocusStateSpy
  let childDesired = {
    child_identified: false,
    child_in_home: false,
    preferred_ages: [

    ],
    preferred_sibling_group_up_to: {
      id: '',
      value: ''
    }
  }
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    childDesiredComp = mount(<ChildDesiredMain
      focusComponentName={'ChildDesiredMain'}
      childDesired={childDesired}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy}
      siblingGroups={siblingGroups.items}
      ageGroups={ageGroups.items}
    />)
  })
  it('verify component load', () => {
    let componentId = childDesiredComp.find('#ChildDesiredMain')
    expect(componentId.length).toBe(1)
  })
  it('verify focus component', () => {
    let componentId = childDesiredComp.find('#ChildDesiredMain')
    componentId.simulate('click')
    expect(setFocusStateSpy).toHaveBeenCalledWith('ChildDesiredMain')
  })
  it('verify child component change State', () => {
    let componentId = childDesiredComp.find('#child_identifiedtrue').hostNodes()
    componentId.simulate('change', {target: {value: 'false'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('childDesired', Object({ child_identified: 'false', child_in_home: '', preferred_ages: [ ], preferred_sibling_group_up_to: Object({ id: '', value: '' }) }))
  })
})
