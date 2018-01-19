import React from 'react'
import ApplicationsTable from './applicationsTable'

export default class Rfa01ListView extends React.Component {
  render () {
    return (
      <ApplicationsTable applications={this.props.applications} />
    )
  }
}
