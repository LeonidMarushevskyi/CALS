import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import ReferencesCard from './referencesCard'
import {checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import {getFocusClassName} from 'helpers/cardsHelper.jsx'

const blankReferenceFields = Object.freeze({
  name_suffix: null,
  name_prefix: null,
  first_name: '',
  middle_name: '',
  last_name: '',
  mailing_address: {
    street_address: '',
    zip: '',
    city: '',
    state: null
  },
  phone_number: '',
  email: ''
})
export default class ReferenceMain extends React.Component {
  constructor (props) {
    super(props)
    this.setReferencesState = this.setReferencesState.bind(this)
  }
  setReferencesState (key, value, referencesIndex) {
    let newData = Immutable.fromJS(this.props.references)
    newData = newData.update(referencesIndex, x => x.set(key, value))
    this.props.setParentState('references', newData.toJS())
  }
  render () {
    const references = this.props.references
    return (
      <div className='reference_main'>
        <div>Please list the name, telephone number(s), and address of three individuals who have knowledge of your home environment, lifestyle, and
          ability to be a Resource Family. <b>*Must include 3 references</b></div>
        {
          references.map((referencesId, index) => {
            return (
              <div key={index} id={'referenceMain_' + index} onClick={() => this.props.setFocusState('referenceMain_' + index)}
                className={this.props.getFocusClassName('referenceMain_' + index) + ' ' + 'card reference-section double-gap-top active-bar'}>
                <div className='card-header'>
                  <span>Reference -{index + 1}</span>
                </div>
                <div className='card-body'>
                  <div className='row'>
                    <ReferencesCard
                      index={index}
                      idPrefix={'reference[' + index + '].'}
                      reference={referencesId}
                      stateTypes={this.props.stateTypes}
                      suffixTypes={this.props.suffixTypes}
                      prefixTypes={this.props.prefixTypes}
                      nameTypes={this.props.nameTypes}
                      setParentState={this.setReferencesState}
                      validator={this.props.validator}
                      errors={this.props.errors[index]}
                      hideNameType
                    />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

ReferenceMain.propTypes = {
  suffixTypes: PropTypes.array.isRequired,
  references: PropTypes.array.isRequired,
  prefixTypes: PropTypes.array.isRequired,
  nameTypes: PropTypes.array.isRequired,
  stateTypes: PropTypes.array.isRequired,
  setParentState: PropTypes.func.isRequired,
  errors: PropTypes.array
}

ReferenceMain.defaultProps = {
  references: [blankReferenceFields, blankReferenceFields, blankReferenceFields],
  errors: []
}
