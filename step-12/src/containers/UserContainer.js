import React, { useEffect } from 'react';
import Users from '../components/Users';
import { connect } from 'react-redux';
import { getUsers } from '../modules/users';

const UserContainer = ({ users, getUsers }) => {

  useEffect(() => {
    if(users) return;
    getUsers();
  }, [ getUsers, users ]);

  return <Users users={users}/>;
};

export default connect(
  ({ users }) => ({
    users: users.users,
  }),
  {
    getUsers,
  },
)(UserContainer);
