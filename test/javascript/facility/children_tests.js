import React from 'react'
import Children from '../../../app/javascript/facility/children.jsx'
import ShallowRenderer from 'react-test-renderer/shallow'

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
  const renderChildComp = new ShallowRenderer()
  const childComp = renderChildComp.render(<Children {...props} />)
  const resultTag = childComp.props
  it('check Children table', function () {
    expect(resultTag.className).toBe('facility-children col-xs-12 col-sm-12 col-md-12 col-lg-12')
  })
  it('Verify ID', function () {
    let childID = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[0].props.children[1]
    expect(childID).toBe(2222)
  })
  it('Verify child first name', function () {
    let childFirstName = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[1].props.children[1]
    expect(childFirstName).toBe('Mei')
  })
  it('Verify child last name', function () {
    let childLastName = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[2].props.children[1]
    expect(childLastName).toBe('Takahashi')
  })
  it('Verify child gender/sex', function () {
    let childsGender = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[3].props.children[1]
    expect(childsGender).toBe('F')
  })
  it('Verify child age', function () {
    let childsAge = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[4].props.children[1]
    expect(childsAge).toBe(17)
  })
  it('Verify child date of birth', function () {
    let childDateOfBirth = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[5].props.children[1]
    expect(childDateOfBirth).toBe('2000-05-28')
  })
  it('Verify date of placement', function () {
    let dateOfPlacement = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[6].props.children[1]
    expect(dateOfPlacement).toBe('01/02/2003')
  })
  it('Verify assigned worker full name', function () {
    let assignedWorkerFullName = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[7].props.children[1]
    expect(assignedWorkerFullName).toBe('Peter Parker')
  })
  it('Verify child county of origin', function () {
    let countyOfOrigin = childComp.props.children.props.children[1].props.children[1].props.children[0].props.children[8].props.children[1]
    expect(countyOfOrigin).toBe('sacramento')
  })
})
