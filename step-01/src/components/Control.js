import React, { Component } from 'react';

class Control extends Component {
  render() {
    return (
      <ul>
        <li><a href="/create" onClick={(event) => {
          event.preventDefault();
          this.props.onChangeMode('create');
        }}>create</a></li>
        <li><a href="/update" onClick={(event) => {
          event.preventDefault();
          this.props.onChangeMode('update');
        }}>update</a></li>
        <li><input type="button" value="delete" onClick={(event) => {
          event.preventDefault();
          this.props.onChangeMode('delete');
        }} /></li>
      </ul>
    )
  }
}

export default Control