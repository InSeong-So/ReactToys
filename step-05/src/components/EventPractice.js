import React, { useState } from 'react'

const EventPractice = () => {
  const [form, setForm] = useState({
    username: '',
    message: '',
  });

  const { username, message } = form;

  const onChangeInput = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value
    }
    setForm(nextForm);
  };
  const onClickAlert = () => {
    if(!username || !message){
      alert('값을 입력하세요.');
      return;
    }
    alert(`${username} : ${message}`);
    setForm({
      username: '',
      message: ''
    });
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickAlert();
    }
  }
  return (
    <div>
      <p>{message}</p>
      <input type='text' name='username' value={username} onChange={onChangeInput} onKeyPress={onKeyPress} /><br />
      <input type='text' name='message' value={message} onChange={onChangeInput} onKeyPress={onKeyPress} /><br />
      <button onClick={onClickAlert}>현재 메세지는?</button>
    </div>
  )
}

export default EventPractice