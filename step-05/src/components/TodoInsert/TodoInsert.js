import React, { useCallback, useState } from 'react'
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(({ target }) => {
    setValue(target.value);
  }, []);

  const onSubmit = useCallback(event => {
    onInsert(value);
    setValue('');
    event.preventDefault();
  }, [onInsert, value]);

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일이 무엇인가요?"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  )
}

export default TodoInsert
