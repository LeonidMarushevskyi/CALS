import React from 'react'
import {shallow, mount} from 'enzyme'
import ChildDesiredGroup from 'rfa_forms/rfa01c_edit_view/childDesiredGroup.jsx'
import {schoolGrades, countyTypes, suffixTypes, genderTypes, stateTypes} from './../../helpers/constants'
import Validator from 'helpers/validator'

describe('Verify Child Desired Comp', () => {
  let childDesiredComp, setParentStateSpy, getFocusClassNameSpy, setFocusStateSpy
  let validator = new Validator({})

  const identifiedChildren = Object.freeze({
    first_name: '',
    middle_name: '',
    last_name: '',
    name_suffix: null,
    date_of_birth: '',
    gender: null,
    county_of_jurisdiction: null,
    date_of_placement: '',
    relationship_to_applicants: [
      {
        applicant_id: '',
        relationship_to_applicant: null
      }
    ],
    school_grade: null,
    school_name: '',
    school_address: {
      street_address: '',
      zip: '',
      city: '',
      state: null,
      type: {
        value: 'Mailing',
        id: 3
      }
    }
  })
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')

    childDesiredComp = mount(<ChildDesiredGroup
      focusComponentName={'ChildDesiredMain'}
      identified_children={identifiedChildren}
      desiredChild={identifiedChildren}
      getFocusClassName={getFocusClassNameSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy}
      countyTypes={countyTypes.items}
      schoolGrades={schoolGrades.items}
      genderTypes={genderTypes.items}
      suffixTypes={suffixTypes.items}
      stateTypes={stateTypes.items}
      validator={validator}
    />)
  })
  it('verify component load', () => {
    let componentId = childDesiredComp.find('#DesiredChildSection')
    expect(componentId.length).toBe(1)
  })

  it('verify focus component', () => {
    let componentId = childDesiredComp.find('#DesiredChildSection')
    componentId.simulate('click')
    expect(setFocusStateSpy).toHaveBeenCalledWith('ChildDesiredMain')
  })
})
