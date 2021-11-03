import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

// // useSelector 사용 전
// const CounterContainer = ({ number, increase, decrease }) => {
//   return <Counter number={number} onIncrease={increase} onDecrease={decrease} />;
// };

// // // 첫 번째 : mapStateProps, mapDispatchProps 사용하기
// // export default connect(
// //   state => ({
// //     number: state.counter.number,
// //   }), dispath => ({
// //     increase: () => {
// //       dispath(increase());
// //     },
// //     decrease: () => {
// //       dispath(decrease());
// //     },
// //   }),
// // )(CounterContainer);

// // // 두 번째 : bindActionCreators 사용하기
// // export default connect(
// //   state => ({
// //     number: state.counter.number,
// //   }), dispath => 
// //     bindActionCreators({
// //       increase, decrease,
// //     }, dispath),
// // )(CounterContainer);

// // 세 번째 : 액션 생성 함수로 이루어진 객체로 넣기, 객체로 넣으면 connect 함수가 내부적으로 bindActionCreators 작업을 대신 해줍니다.
// export default connect(
//   state => ({
//     number: state.counter.number,
//   }),
//   {
//     increase, decrease, 
//   },
// )(CounterContainer);

// useSelector 사용하기
const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();
  return (
    <Counter
      number={number}
      onIncrease={() => dispatch(increase())}
      onDecrease={() => dispatch(decrease())}
    />);
};

export default CounterContainer;