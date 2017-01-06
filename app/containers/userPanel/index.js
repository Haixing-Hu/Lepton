'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUserSession, removeAccessToken } from '../../actions/index'
import { bindActionCreators } from 'redux'
import { Button, Image } from 'react-bootstrap'
import './index.scss'

class UserPanel extends Component {

  renderOutSection () {
    return (
      <Button type="button" className='user-session-button'
        onClick={ () => this.handleLoginClicked() }>LOGIN</Button>
    )
  }

  renderInSection () {
    return (
      <div>
        <Button type="button" className='user-session-button'
          onClick={ this.handleLogoutClicked.bind(this) }>LOGOUT</Button>
        <Button type="button" className='user-session-button'
          onClick={ this.handleSyncClicked.bind(this) }>Sync</Button>
        <a>Last Sync: { this.props.syncTime }</a>
      </div>
    )
  }

  handleLoginClicked () {
    console.log('** Login clicked')
    this.props.launchAuthWindow()
  }

  handleLogoutClicked () {
    console.log('** Logout clicked')
    console.log('** dispatch logoutUserSession')
    this.props.logoutUserSession()
    removeAccessToken()
  }

  handleSyncClicked () {
    console.log('** Sync clicked')
    this.props.reSyncUserGists()
  }

  renderProfile () {
    let profile = this.props.userSession.profile
    if (!profile || this.props.userSession.active === 'false') {
      return
    }

    return (
      <div><Image className='profile-image-section' src={ profile.avatar_url } circle/></div>
    )
  }

  render () {
    return (
      <div className='user-panel'>
        <div>
          { this.renderProfile() }
        </div>
        { this.props.userSession.active === 'true'
            ? this.renderInSection()
            : this.renderOutSection() }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userSession: state.userSession,
    syncTime: state.syncTime
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    logoutUserSession: logoutUserSession
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
