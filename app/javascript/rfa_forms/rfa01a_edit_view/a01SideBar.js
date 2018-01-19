import Immutable from 'immutable'
import React from 'react'
import Collapsible from 'react-collapsible'
import Affix from 'react-overlays/lib/AutoAffix'
import PropTypes from 'prop-types'
import {NavLinks, NavLink} from 'react-wood-duck'

const A01SideBar = ({
  isNavLinkActive,
  handleNavLinkClick,
  hideRelationshipBetweenApplicants
}) => {
  return (
    <div className='col-lg-12'>
      <div className='col-lg-10' >
        <Affix>
          <div className='side-bar' aria-label='Side Bar'>
            <Collapsible trigger={<h1>RFA 01 A</h1>} open>
              <NavLinks>
                <NavLink
                  active={isNavLinkActive('#applicants-card')}
                  clickHandler={() => handleNavLinkClick('#applicants-card')}
                  text='1. Applicant Information'
                  href='#applicants-card' />
                <NavLink
                  active={isNavLinkActive('#applicant-residence-card')}
                  clickHandler={() => handleNavLinkClick('#applicant-residence-card')}
                  text='2. Applicant Residence'
                  href='#applicant-residence-card' />
                {
                  hideRelationshipBetweenApplicants === 'hidden' ? null
                    : <NavLink
                      active={isNavLinkActive('#relationship-between-applicants-card')}
                      clickHandler={() => handleNavLinkClick('#relationship-between-applicants-card')}
                      text='3. Applicant Relationship'
                      href='#relationship-between-applicants-card' />
                }
                <NavLink
                  active={isNavLinkActive('#minor-child-card')}
                  clickHandler={() => handleNavLinkClick('#minor-child-card')}
                  text='4. Minor Children'
                  href='#minor-child-card' />
                <NavLink
                  active={isNavLinkActive('#other-adults-card')}
                  clickHandler={() => handleNavLinkClick('#other-adults-card')}
                  text='5. Other Adults'
                  href='#other-adults-card' />
                <NavLink
                  active={isNavLinkActive('#marital-history-card')}
                  clickHandler={() => handleNavLinkClick('#marital-history-card')}
                  text='6. Marital History'
                  href='#marital-history-card' />
                <NavLink
                  active={isNavLinkActive('#child-desired-card')}
                  clickHandler={() => handleNavLinkClick('#child-desired-card')}
                  text='7. Child Desired'
                  href='#child-desired-card' />
                <NavLink
                  active={isNavLinkActive('#foster-care-card')}
                  clickHandler={() => handleNavLinkClick('#foster-care-card')}
                  text='8. Foster Care History'
                  href='#foster-care-card' />
                <NavLink
                  active={isNavLinkActive('#reference-card')}
                  clickHandler={() => handleNavLinkClick('#reference-card')}
                  text='9. References'
                  href='#reference-card' />
              </NavLinks>
            </Collapsible>
          </div>
        </Affix>
      </div>
      <div className='col-lg-2'>
        <Affix>
          <hr className='vertical' />
        </Affix>
      </div>
    </div>
  )
}

A01SideBar.propTypes = {
  isNavLinkActive: PropTypes.func,
  handleNavLinkClick: PropTypes.func,
  hideRelationshipBetweenApplicant: PropTypes.bool
}
export default A01SideBar
