import React, { Component } from 'react'

class CreateContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
    }
  }
  render() {
    return (
      <form action="/create_post" method="post" onSubmit={(event) => {
        event.preventDefault();
        this.props.onCreateItem(this.state.title, this.state.desc);
      }}>
        <p>
          <input type="text" name="title" placeholder="title" onChange={(event) => {
            this.setState({
              title: event.target.value
            })
          }}></input>
        </p>
        <p>
          <textarea name="desc" placeholder="desc" onChange={(event) => {
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

export default CreateContent