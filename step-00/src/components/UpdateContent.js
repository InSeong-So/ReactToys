import React, { Component } from 'react'

class UpdateContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    }
  }
  render() {
    return (
      <form action="/update_post" method="post" onSubmit={(event) => {
        event.preventDefault();
        this.props.onUpdateItem(this.state);
      }}>
        <p>
          <input type="text" name="title" placeholder="title"
            value={this.state.title} onChange={(event) => {
              this.setState({
                title: event.target.value
              })
            }}></input>
        </p>
        <p>
          <textarea name="desc" placeholder="desc"
            value={this.state.desc} onChange={(event) => {
              this.setState({
                desc: event.target.value
              })
            }}></textarea>
        </p>
        <input type="submit" value="저장"></input>
      </form>
    )
  }
}

export default UpdateContent