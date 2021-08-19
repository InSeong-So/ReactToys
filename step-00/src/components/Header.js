import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          <a href="/" onClick={event => {
            event.preventDefault();
            this.props.onClickHome();
          }}>WEB</a>
        </h1>
      </header>
    )
  }
}

export default Header