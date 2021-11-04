import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/User';
import { Preloader, usePreloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';

const UserContainer = ({ id }) => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  usePreloader(() => dispatch(getUser(id)));  // 서버 사이드 렌더링 시 API 호출하기
  useEffect(() => {
    if (user && user.id === +id) return;
    dispatch(getUser(id));
  }, [ dispatch, id, user ]);

  // // usePreloader로 호출하므로 필요 없습니다.
  // if (!user) {
  //   return <Preloader resolve={() => dispatch(getUser(id))} />;
  // }
  if(!user) return null;
  return <User user={user} />;
};

export default UserContainer;
