import React from 'react'
import FacilityComplaints from '../../../app/javascript/facility/complaints.jsx'
import ShallowRenderer from 'react-test-renderer/shallow'

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
  const renderComplaintsComp = new ShallowRenderer()
  const complaintsComp = renderComplaintsComp.render(<FacilityComplaints {...props} />)
  const resultTag = complaintsComp.props
  it('check Complaints table', function () {
    expect(resultTag.className).toBe('facility-children col-xs-12 col-sm-12 col-md-12 col-lg-12')
  })
  it('Verify Complaint ID', function () {
    let complaintId = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[0].props.children[1]
    expect(complaintId).toBe('dlf0245')
  })
  it('Verify complaint date', function () {
    let complaintDate = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[1].props.children[1]
    expect(complaintDate).toBe('2016-09-27 00:00:00')
  })
  it('Verify assigned worker full name', function () {
    let assignedWorkerFullName = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[2].props.children[1]
    expect(assignedWorkerFullName).toBe('Harry Potter')
  })
  it('Verify complaint control number', function () {
    let complaintControlNumber = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[3].props.children[1]
    expect(complaintControlNumber).toBe('19-CR-20160927081411')
  })
  it('Verify priority level', function () {
    let priorityLevel = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[4].props.children[1]
    expect(priorityLevel).toBe('2')
  })
  it('Verify complaint status', function () {
    let complaintStatus = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[5].props.children[1]
    expect(complaintStatus).toBe('Approved')
  })
  it('Verify complaint approval date', function () {
    let complaintApprovalDate = complaintsComp.props.children.props.children[1].props.children[1].props.children[0].props.children[6].props.children[1]
    expect(complaintApprovalDate).toBe('2016-12-10 00:00:00')
  })
})
