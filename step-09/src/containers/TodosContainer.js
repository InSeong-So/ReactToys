import React from 'react';
import { useSelector } from 'react-redux';
// import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import useActions from '../lib/useActions';

// const TodosContainer = ({ input, todos, changeInput, insert, toggle, remove }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   );
// };

// export default connect(
//   ({ todos }) => ({
//     input: todos.input,
//     todos: todos.todos,
//   }),
//   {
//     changeInput,
//     insert,
//     toggle,
//     remove,
//   },
// )(TodosContainer);

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));
  // const dispatch = useDispatch();
  // const onChangeInput = useCallback(input => dispatch(changeInput(input)), [ dispatch ]);
  // const onInsert = useCallback(text => dispatch(insert(text)), [ dispatch ]);
  // const onToggle = useCallback(id => dispatch(toggle(id)), [ dispatch ]);
  // const onRemove = useCallback(id => dispatch(remove(id)), [ dispatch ]);
  const [ onChangeInput, onInsert, onToggle, onRemove ] = useActions([ changeInput, insert, toggle, remove ], []);
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// connect는 props를 비교하여 렌더링하는 성능 최적화가 적용되어 있지만
// useSelector를 사용하면 최적화가 이루어지지 않는다.
export default React.memo(TodosContainer);