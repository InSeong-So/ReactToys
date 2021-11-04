import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import User from '../components/User';
import { Preloader } from '../lib/PreloadContext';
import { getUser } from '../modules/users';

const UserContainer = ({ id }) => {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {

    if (user && user.id === +id) return;
    dispatch(getUser(id));
  }, [ dispatch, id, user ]);

  if (!user) {
    return <Preloader resolve={() => dispatch(getUser(id))} />;
  }
  return <User user={user} />;
};

export default UserContainer;
