import React from 'react'
import FacilityComplaints from '../../../app/javascript/facility/complaints.jsx'
import {mount} from 'enzyme'

describe('Verify Complaints Component', function () {
  const props = {
    facilityData: {
      'count': 3,
      'complaints': [
        {
          'id': 'dlf0245',
          'complaint_date': '2016-09-27 00:00:00',
          'assigned_worker': 'Harry Potter',
          'control_number': '19-CR-20160927081411',
          'priority_level': '2',
          'status': 'Approved',
          'approval_date': '2016-12-10 00:00:00'
        }
      ]
    }
  }
  const renderComplaintsComp = mount(<FacilityComplaints {...props} />)
  it('check Complaints table', () => {
    expect(renderComplaintsComp.length).toBe(1)
  })
  it('Verify Complaint ID', function () {
    expect(renderComplaintsComp.find('td[data-label="id"]').props().children[1]).toBe('dlf0245')
  })
  it('Verify complaint date', function () {
    expect(renderComplaintsComp.find('td[data-label="complaint date"]').props().children[1]).toBe('2016-09-27 00:00:00')
  })
  it('Verify assigned worker full name', function () {
    expect(renderComplaintsComp.find('td[data-label="assigned worker"]').props().children[1]).toBe('Harry Potter')
  })
  it('Verify complaint control number', function () {
    expect(renderComplaintsComp.find('td[data-label="control number"]').props().children[1]).toBe('19-CR-20160927081411')
  })
  it('Verify priority level', function () {
    expect(renderComplaintsComp.find('td[data-label="priority level"]').props().children[1]).toBe('2')
  })
  it('Verify complaint status', function () {
    expect(renderComplaintsComp.find('td[data-label="status"]').props().children[1]).toBe('Approved')
  })
  it('Verify complaint approval date', function () {
    expect(renderComplaintsComp.find('td[data-label="approval date"]').props().children[1]).toBe('2016-12-10 00:00:00')
  })
})
