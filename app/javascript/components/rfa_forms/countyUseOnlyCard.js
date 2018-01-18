import React from 'react'
import PropTypes from 'prop-types'
import {DropDownField} from 'components/common/dropDownField'

const CountyUseOnlyCard = ({
  setFocusState,
  getFocusClassName,
  county,
  CountyList,
  onFieldChange
}) => {
  return (
    <div className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <div className='county_use_only_card'>
        <div id='CountyUseOnlySection'
          onClick={() => setFocusState('CountyUseOnlySection')}
          className={getFocusClassName('CountyUseOnlySection') + ' ' + 'card phone-section double-gap-top active-bar'}>
          <div className='card-header'>
            <span>For County Use Only</span>
          </div>
          <div className='card-body'>
            <div className='row'>
              <DropDownField
                gridClassName='col-md-4'
                id='county'
                selectClassName='reusable-select'
                label='County'
                value={county}
                optionList={CountyList}
                onChange={onFieldChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
CountyUseOnlyCard.propTypes = {
  setFocusState: PropTypes.func,
  getFocusClassName: PropTypes.func,
  CountyList: PropTypes.array,
  onFieldChange: PropTypes.func.isRequired
}

CountyUseOnlyCard.defaultProps = {
  county: ''
}

export {CountyUseOnlyCard}
