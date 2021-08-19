import React, { Component } from 'react'

class TOC extends Component {
  render() {
    const list = this.props.data.map(item => {
      return <li key={item.id}>
        <a href={"/content" + item.id} onClick={event => {
          event.preventDefault();
          this.props.onChangeTitle(item.id);
        }}>{item.title}</a>
      </li>
    })
    return (
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    )
  }
}

export default TOC