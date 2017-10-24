import Immutable from 'immutable'
import {checkArrayObjectPresence} from './commonHelper'

export const addCardAsJS = (inputArray, newCardFields) => {
  let inputList = Immutable.fromJS(inputArray)
  return inputList.push(newCardFields).toJS()
}

export const removeCardAsJS = (inputArray, index, newCardFields) => {
  let inputList = Immutable.fromJS(inputArray)
//  inputList = inputList.delete(index)
// TODO: add a delete bit to inputList element if id is present
  if (inputList.size === 0) {
    inputList = inputList.push(newCardFields)
  }
  return inputList.toJS()
}

export const getFocusClassName = (focusedComponentName, currentComponentName) => {
  return focusedComponentName === currentComponentName ? 'edit' : 'show'
}

export const setToWhomOptionList = (applicants) => {
  const newApplicants = applicants.map((applicant, index) => {
    return {id: applicant.id, value: applicant.first_name + ' ' + applicant.middle_name + ' ' + applicant.last_name}
  })
  return newApplicants
}

export const handleRelationshipTypeToApplicant = (index, value, type, items) => {
  let itemsList = Immutable.fromJS(items)
  itemsList = itemsList.setIn([index, 'relationship_to_applicants', 0, type], value)
  return itemsList.toJS()
}

export const handleToWhomValue = (applicantId, applicants) => {
  let newApplicants = {id: '', value: ''}
  if (applicantId) {
    newApplicants = applicants.map((applicant) => {
      return {id: (applicant.id ? applicant.id : 0), value: applicant.first_name + ' ' + applicant.middle_name + ' ' + applicant.last_name}
    })
    if (!isNaN(Number(applicantId))) {
      newApplicants = newApplicants.find(x => x.id === Number(applicantId))
    }
    // if (newApplicants.id == null) {
    //   newApplicants.id = 0
    // }
  }
  return newApplicants
}
export const checkForNameValidation = (applicantData) => {
  let validationResult = false
  if (checkArrayObjectPresence(applicantData)) {
    if (applicantData[0] && applicantData[0].first_name && applicantData[0].last_name) {
      validationResult = applicantData[0].first_name.length > 0 && applicantData[0].last_name.length > 0
    }
  }
  return validationResult
}

export const arrayLastToFirst = (arraytoSort) => {
  if (arraytoSort.length > 1) {
    let finalArray = Immutable.fromJS(arraytoSort).slice(0, -1).toJS()
    let lastValue = Immutable.fromJS(arraytoSort).slice(-1).toJS()
    finalArray = lastValue.concat(finalArray)
    return finalArray
  } else {
    return arraytoSort
  }
}
