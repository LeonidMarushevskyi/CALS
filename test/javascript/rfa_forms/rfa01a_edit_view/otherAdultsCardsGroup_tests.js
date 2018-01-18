import React from 'react'
import OtherAdultsCardsGroup, {otherAdultsDefaults} from 'rfa_forms/rfa01a_edit_view/OtherAdultsCardsGroup.js'
import {shallow, mount} from 'enzyme'
import {relationshipTypes} from '../../helpers/constants'
import Validator from 'helpers/validator'

describe('Verify other adults Component View', function () {
  let component, componentMount, props, setParentStateSpy, otherAdultsCardCompWithoutOtherAdults

  const OtherAdultsCard = {
    relationship_types: {
      items: []
    },
    relationship_to_applicants: [
      {
        applicant_id: null,
        relationship_to_applicant: {
          'id': 0,
          'value': ''
        }
      }
    ],
    index: 0,
    'first_name': '',
    'middle_name': '',
    'last_name': '',
    date_of_birth: '2017-01-01'
  }

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    let setFocusStateSpy = jasmine.createSpy('setFocusState')
    let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')

    let handleRelationshipTypeToApplicantSpy = jasmine.createSpy('handleRelationshipTypeToApplicant')
    let onFieldChangeSpy = jasmine.createSpy('onFieldChange')
    let validator = new Validator({})
    props = {
      otherAdults: [OtherAdultsCard],
      relationship_types: relationshipTypes,
      relationshipToApplicantTypes: relationshipTypes,
      setParentState: setParentStateSpy,
      onFieldChange: onFieldChangeSpy,
      setFocusState: setFocusStateSpy,
      getFocusClassName: getFocusClassNameSpy,
      handleRelationshipTypeToApplicant: handleRelationshipTypeToApplicantSpy,
      validator: validator
    }
    component = shallow(
      <OtherAdultsCardsGroup {...props} />
    )
    componentMount = mount(<OtherAdultsCardsGroup {...props} />)

    otherAdultsCardCompWithoutOtherAdults = shallow(<OtherAdultsCardsGroup
      otherAdults={[]}
      relationship_types={relationshipTypes}
      relationshipToApplicantTypes={relationshipTypes}
      setParentState={setParentStateSpy}
      onFieldChange={onFieldChangeSpy}
      setFocusState={setFocusStateSpy}
      getFocusClassName={getFocusClassNameSpy}
      handleRelationshipTypeToApplicant={handleRelationshipTypeToApplicantSpy}
      validator={validator} />)
  })

  describe('Verify other adult card Component View', () => {
    it('has simulates relationship field change', function () {
      componentMount.update()
      spyOn(componentMount.instance(), 'handleRelationshipTypeToApplicant').and.callThrough()
      let relationShipField = componentMount.findWhere(n => n.props().id === 'otherAdults[0].relationshipType').hostNodes()
      relationShipField.simulate('change', {target: {options: {'2': {value: '2', text: 'Sibling'}, selectedIndex: 2}}})
      OtherAdultsCard.relationship_to_applicants[0].relationship_to_applicant = { id: '2', value: 'Sibling' }
      expect(setParentStateSpy).toHaveBeenCalledWith('otherAdults', [OtherAdultsCard])
    })
  })

  describe('Verify other adults Component View', () => {
    it('has class name', function () {
      expect(component.find('.card-body').length).toEqual(1)
    })
    it('expect children to be array', function () {
      expect(component.children.length).toEqual(1)
    })

    it('expect default props to be used', function () {
      expect(otherAdultsCardCompWithoutOtherAdults.find('.card-body').length).toEqual(1)
    })
  })

  describe('when "Add new other adult card" is clicked', () => {
    it('expect add other adult card to be button', function () {
      expect(component.find('button[className="btn btn-default"]').type()).toEqual('button')
    })

    it('calls addCard and resulting otherAdults contains 2 cards', () => {
      spyOn(component.instance(), 'addCard').and.callThrough()
      component.instance().addCard()
      expect(component.instance().addCard).toHaveBeenCalled()

      // build data that parent should be called with
      let newData = []
      newData[0] = OtherAdultsCard
      newData[1] = otherAdultsDefaults

      expect(setParentStateSpy).toHaveBeenCalledWith('otherAdults', newData)
    })
  })

  describe('when close other adult card is clicked', () => {
    it('Clears data when 1 adult is present', () => {
      spyOn(component.instance(), 'clickClose').and.callThrough()
      component.find('.remove-btn').simulate('click')

      expect(component.instance().clickClose).toHaveBeenCalled()

      expect(props.otherAdults.length).toEqual(1)
      expect(setParentStateSpy).toHaveBeenCalled()
    })

    it('Deletes other adult when 2 cards are present', () => {
      let newData = []
      newData[0] = OtherAdultsCard
      newData[1] = otherAdultsDefaults
      component.setProps({otherAdults: newData})
      spyOn(component.instance(), 'clickClose').and.callThrough()
      component.find('.remove-btn').at(0).simulate('click')
      component.update()
      expect(component.instance().clickClose).toHaveBeenCalledWith(0)
      expect(props.otherAdults.length).toEqual(1)
    })

    it('Verify application State Change', () => {
      let NameFields = componentMount.find('input[type="text"]')
      let firstNameField = NameFields.find('#lastName')
      firstNameField.simulate('change', {target: {value: 'dude'}})
      OtherAdultsCard.last_name = 'dude'
      expect(setParentStateSpy).toHaveBeenCalledWith('otherAdults', [OtherAdultsCard])
    })
  })
})
