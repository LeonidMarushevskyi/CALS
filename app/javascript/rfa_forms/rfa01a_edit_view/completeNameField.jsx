import React from 'react'
import PropTypes from 'prop-types'
import {InputComponent} from '../../components/common/inputFields'
import {DropDownField} from '../../components/common/dropDownField'
import NameCommonFields from '../../components/common/nameCommonFields'
import {getDictionaryId, dictionaryNilSelect} from 'helpers/commonHelper.jsx'

const CompleteNameFields = ({
  referenceId,
  index,
  fieldValues,
  onChange,
  suffixTypes,
  prefixTypes,
  nameTypes}) => {
  const isAddedComponent = index === undefined ? false : true
  return (
    <div>
      <div className="col-md-12 remove-padding">
        <DropDownField gridClassName="col-md-4" id='name_prefix'
          value={getDictionaryId(fieldValues.name_prefix)}
          selectClassName={'reusable-select'}
          optionList={prefixTypes}
          label={'Prefix'}
          onChange={(event, id) => onChange('name_prefix', dictionaryNilSelect(event.target.selectedOptions[0]), index || referenceId)} />
      </div>
      <div className="col-md-12 remove-padding">
        <NameCommonFields
          index={index || referenceId}
          fieldValues={fieldValues}
          onChange={onChange}/>
      </div>
      <div className="col-md-4 remove-padding">
        <DropDownField gridClassName='col-md-12' id='name_suffix'
          value={getDictionaryId(fieldValues.name_suffix)}
          selectClassName={'reusable-select'}
          optionList={suffixTypes}
          label={'Suffix'}
          onChange={(event, id) => onChange('name_suffix', dictionaryNilSelect(event.target.selectedOptions[0]), index || referenceId)} />
      </div>
      {isAddedComponent && <div className="col-md-4 remove-padding">
        <DropDownField gridClassName='col-md-12' id='name_type'
          value={getDictionaryId(fieldValues.name_type)}
          selectClassName={'reusable-select'}
          optionList={nameTypes}
          label={'Name Type'}
          onChange={(event, id) => onChange('name_type', dictionaryNilSelect(event.target.selectedOptions[0]), index || referenceId)} />
      </div>
      }
    </div>
  )
}

CompleteNameFields.propTypes = {
  nameTypes: PropTypes.array.isRequired,
  prefixTypes: PropTypes.array.isRequired,
  suffixTypes: PropTypes.array.isRequired,
  fieldValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default CompleteNameFields
