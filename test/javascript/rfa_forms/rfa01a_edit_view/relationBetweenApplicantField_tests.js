import React from 'react'
import RelationshipBetweenApplicantsFields from 'rfa_forms/rfa01a_edit_view/relationshipBetweenApplicantsFields.js'
import {stateTypes, applicantrelationTypes} from './../../helpers/constants'
import {shallow, mount} from 'enzyme'
import Validator from 'helpers/validator'

describe('Verify relation between applicant', function () {
  const blankValues = Object.freeze({
    relationship_type: {
      id: 1,
      value: 'Married'
    },
    date_of_relationship: '',
    place_of_relationship_city: '',
    place_of_relationship_state: {
      id: 0,
      value: ''
    }
  })

  const applicants = Object.freeze({
    applicants: [{
      first_name: 'thing'},
    {
      first_name: 'thing'}
    ]})

  let setParentStateSpy, relationCardComp, onChange, validator
  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    onChange = jasmine.createSpy('onChange')
    // props.onChange = onChange

    validator = new Validator({})

    relationCardComp = shallow(<RelationshipBetweenApplicantsFields

      relationshipTypes={applicantrelationTypes}
      relationshipBetweenApplicants={blankValues}
      setParentState={setParentStateSpy}
      applicants={applicants}
      onChange={onChange}
      stateTypes={stateTypes.items}
      validator={validator}
    />)
  })

  // const aboutResidenceCard = new ShallowRenderer()

  it('verify relation ship state', () => {
    let relationField = relationCardComp.find('#place_of_relationship_state')
    relationField.simulate('change', {target: {selectedOptions: [{value: '1', text: 'Alabama'}]}})
    expect(setParentStateSpy).toHaveBeenCalledWith('place_of_relationship_state', {id: '1', value: 'Alabama'})
  })

  it('verify relationship_type', () => {
    let relationField = relationCardComp.find('#relationship_type')
    relationField.simulate('change', {target: {selectedOptions: [{value: '1', text: 'Married'}]}})
    expect(setParentStateSpy).toHaveBeenCalledWith('relationship_type', {id: '1', value: 'Married'})
  })

  it('verify date_of_relationship', () => {
    // figure out how to test, react widgets datepicker testing is broke
  })

  it('verify place_of_relationship_city', () => {
    let relationField = relationCardComp.find('#place_of_relationship_city')
    relationField.simulate('change', {target: {value: 'some city'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('place_of_relationship_city', 'some city')
  })

  it('verify other_relationship', () => {
    let relationField = relationCardComp.find('#other_relationship')
    relationField.simulate('change', {target: {value: 'other text'}})
    expect(setParentStateSpy).toHaveBeenCalledWith('other_relationship', 'other text')
  })
})
