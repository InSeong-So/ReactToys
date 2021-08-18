import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    }
    // // 사전에 this 바인딩하기
    // this.inputFormHandler = this.inputFormHandler.bind(this)
  }
  inputFormHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <article>
        <h2>Update</h2>
        <form action="/update_process" method="post" onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit(
            this.state.id,
            this.state.title,
            this.state.desc
          )
        }}>
          <input type="hidden" name="id" value={this.state.id}></input>
          {/* 현재 readonly */}
          <p>
            <input type="text" name="title" placeholder="title"
              value={this.state.title} onChange={this.inputFormHandler} />
          </p>
          <textarea name="desc" placeholder="description"
            value={this.state.desc} onChange={this.inputFormHandler} ></textarea>
          <p>
            <input type="submit" value="생성"></input>
          </p>
        </form>
      </article>
    )
  }
}

export default UpdateContent;