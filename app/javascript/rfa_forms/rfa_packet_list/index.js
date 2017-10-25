import React from 'react'
import Rfa01AOverview from './rfa01aOverview'
import Rfa01BOverview from './rfa01bOverview'
import Rfa01COverview from './rfa01cOverview'
import Lic198BOverview from './lic198bOverview'
import CardsGroupLayout from 'components/common/cardsGroupLayout'

export default class Rfa01PacketList extends React.Component {
  constructor (props) {
    super(props)
    this.getFocusClassName = this.getFocusClassName.bind(this)
    this.setFocusState = this.setFocusState.bind(this)

    this.state = {
      focusComponentName: '',
      errors: {}
    }
  }

  setFocusState (focusComponentName) {
    this.setState({focusComponentName: focusComponentName})
  }

  getFocusClassName (componentName) {
    return this.state.focusComponentName === componentName ? 'edit' : 'show'
  }

  render () {
    let applicationId = this.props.application_id
    let application = this.props.rfa_01a_application
    let rfa_01b_forms = this.props.rfa_01b_forms
    return (
      <div>
        <CardsGroupLayout>
          <Rfa01AOverview
            focusComponentName={this.state.focusComponentName}
            applicationId={applicationId}
            application={application}
            setFocusState={this.setFocusState}
            getFocusClassName={this.getFocusClassName} />
        </CardsGroupLayout>
        <CardsGroupLayout>
          <Rfa01BOverview
            focusComponentName={this.state.focusComponentName}
            applicationId={applicationId}
            rfa01BForms={rfa_01b_forms}
            setFocusState={this.setFocusState}
            getFocusClassName={this.getFocusClassName} />
        </CardsGroupLayout>
        <CardsGroupLayout>
          <Rfa01COverview
            focusComponentName={this.state.focusComponentName}
            applicationId={applicationId}
            application={application}
            setFocusState={this.setFocusState}
            getFocusClassName={this.getFocusClassName} />
        </CardsGroupLayout>
        <CardsGroupLayout>
          <Lic198BOverview
            focusComponentName={this.state.focusComponentName}
            applicationId={applicationId}
            application={application}
            setFocusState={this.setFocusState}
            getFocusClassName={this.getFocusClassName} />
        </CardsGroupLayout>
      </div>
    )
  }
}
