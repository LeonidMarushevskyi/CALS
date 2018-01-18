import React from 'react'
import MinorCardsGroup, {minorDefaults} from 'rfa_forms/rfa01a_edit_view//minorCardsGroup.jsx'
import {shallow, mount} from 'enzyme'
import {genderTypes, relationshipTypes} from '../../helpers/constants'
import Validator from 'helpers/validator'
describe('Verify minor children Component View', function () {
  let component, componentMount, setFocusStateSpy
  let props
  const minorCardChild = {
    gender: {
      'id': 0,
      'value': ''
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
    child_financially_supported: 'yes',
    child_adopted: 'yes',
    date_of_birth: '2017-01-01'
  }

  let setParentStateSpy = jasmine.createSpy()
  setFocusStateSpy = jasmine.createSpy('setFocusState')
  let getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')

  beforeEach(() => {
    setParentStateSpy = jasmine.createSpy('setParentState')
    let handleRelationshipTypeToApplicantSpy = jasmine.createSpy('handleRelationshipTypeToApplicant')
    let onFieldChangeSpy = jasmine.createSpy('onFieldChange')
    let validator = new Validator({})
    props = {
      minorChildren: [minorCardChild],
      genderTypes: genderTypes.items,
      relationshipTypes: relationshipTypes,
      relationshipToApplicantTypes: relationshipTypes,
      setParentState: setParentStateSpy,
      setFocusState: setFocusStateSpy,
      getFocusClassName: getFocusClassNameSpy,
      validator: validator
    }

    component = shallow(
      <MinorCardsGroup {...props} />
    )

    componentMount = mount(<MinorCardsGroup {...props} />)
  })
  describe('Verify Foster Care Card Selection', () => {
    it('select foster care card', () => {
      let minorsSectionDiv = component.find('#minorsSection')
      minorsSectionDiv.simulate('click')
      expect(setFocusStateSpy).toHaveBeenCalledWith('minorsSection')
    })
  })
  describe('Verify minor card Component View', () => {
    it('has class name', function () {
      componentMount.update()
      spyOn(componentMount.instance(), 'handleRelationshipTypeToApplicant').and.callThrough()
      let relationShipField = componentMount.find('#relationship_to_applicant').hostNodes()
      relationShipField.simulate('change', {target: {options: {'2': {value: '2', text: 'Sibling'}, selectedIndex: 2}}})
      minorCardChild.relationship_to_applicants[0].relationship_to_applicant = { id: '2', value: 'Sibling' }
      expect(setParentStateSpy).toHaveBeenCalledWith('minorChildren', [minorCardChild])
    })

    it('verify date of birth', () => {
      // TODO will update when switching from react-maskedinput to cleave.js
    })
  })

  describe('Verify minor card Component View', () => {
    it('has class name', function () {
      expect(component.find('.card-body').length).toEqual(1)
    })
    it('expect children to be array', function () {
      expect(component.children.length).toEqual(1)
    })
  })

  describe('when "Add new minor card" is clicked', () => {
    it('expect minor card to be button', function () {
      expect(component.find('button[className="btn btn-default"]').type()).toEqual('button')
    })

    it('calls addCard and resulting minorchildren contains 2 cards', () => {
      spyOn(component.instance(), 'addCard').and.callThrough()
      component.instance().addCard()
      expect(component.instance().addCard).toHaveBeenCalled()

      // build data that parent should be called with
      let newData = []
      newData[0] = minorCardChild
      newData[1] = minorDefaults

      // expect(props.minorchil.length).toEqual(1)
      expect(setParentStateSpy).toHaveBeenCalledWith('minorChildren', newData)
    })

    describe('when close minor card is clicked', () => {
      it('Clears data when 1 phone number is present', () => {
        spyOn(component.instance(), 'clickClose').and.callThrough()
        component.find('.remove-btn').simulate('click')
        let newData = []
        newData[0] = minorCardChild
        newData[1] = minorDefaults
        expect(component.instance().clickClose).toHaveBeenCalled()
        expect(props.minorChildren.length).toEqual(1)
        expect(setParentStateSpy).toHaveBeenCalledWith('minorChildren', [minorDefaults])
      })

      it('Deletes minor children when 2 cards are present', () => {
        let newData = []
        newData[0] = minorCardChild
        newData[1] = minorDefaults
        component.setProps({minorChildren: newData})

        spyOn(component.instance(), 'clickClose').and.callThrough()

        component.find('.remove-btn').at(0).simulate('click')
        component.update()
        expect(component.instance().clickClose).toHaveBeenCalledWith(0)

        // check if setParent is called
        expect(setParentStateSpy).toHaveBeenCalledWith('minorChildren', [minorDefaults])
        expect(props.minorChildren.length).toEqual(1)
      })
    })
  })
})
