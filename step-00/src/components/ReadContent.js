import React, { Component } from 'react'

class ReadContent extends Component {
  render() {
    return (
      <article>
      <h1>{this.props.title}</h1>
      <p>{this.props.desc}</p>
    </article>
    )
  }
}

export default ReadContent