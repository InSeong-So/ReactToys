import React, { useCallback, useRef, useState } from "react";
import TodoTemplate from "./components/TodoTemplate/TodoTemplate";
import TodoInsert from "./components/TodoInsert/TodoInsert";
import TodoList from './components/TodoList/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 기초',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링',
      checked: true,
    },
    {
      id: 3,
      text: 'TODO APP 만들기',
      checked: false,
    }
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos.concat(todo));
    nextId.current += 1;
  }, [todos]);

  const onRemove = useCallback(id => {
    setTodos(todos.filter(todo => id !== todo.id));
  }, [todos])

  const onToggle = useCallback(id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  });

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;