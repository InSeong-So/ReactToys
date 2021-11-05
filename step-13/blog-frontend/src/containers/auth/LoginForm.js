import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = () => {
  const naigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form     : auth.login,
    auth     : auth.auth,
    authError: auth.authError,
    user     : user.user,
  }));
  const [ error, setError ] = useState(null);

  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(
      changeField({
        form: 'login',
        key : name,
        value,
      }),
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [ dispatch ]);

  useEffect(() => {
    if(authError){
      console.log('오류 발생', authError);
      setError('로그인 실패');
      return;
    }
    if(auth){
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [ authError, auth, dispatch ]);

  useEffect(() => {
    if(user){
      naigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('localstorage Error');
      }
    }
  }, [ naigate, user ]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
