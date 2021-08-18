import React, {Component} from 'react';

class CreateContent extends Component {
  render(){
    return (
      <article>
        <h2>Create</h2>
        <form action="/create_process" method="post" onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit(
            event.target.title.value,
            event.target.desc.value
          )
        }}>
          <p><input type="text" name="title" placeholder="title"/></p>
          <textarea name="desc" placeholder="description"></textarea>
          <p>
            <input type="submit" value="생성"></input>
          </p>
        </form>
      </article>
    )
  }
}

export default CreateContent;