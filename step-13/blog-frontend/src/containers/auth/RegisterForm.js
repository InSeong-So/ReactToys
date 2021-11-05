import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form     : auth.register,
    auth     : auth.auth,
    authError: auth.authError,
    user     : user.user,
  }));
  const [ error, setError ] = useState(null);

  const onChange = ({ target }) => {
    const { value, name } = target;
    dispatch(
      changeField({
        form: 'register',
        key : name,
        value,
      }),
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { username, password, passwordConfirm } = form;

    if([ username, password, passwordConfirm ].includes('')){
      setError('빈 칸을 모두 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [ dispatch ]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생', authError);
      if(authError.response.status === 409){
        setError('이미 존재하는 계정입니다.');
        return;
      }
      setError('회원 가입에 실패했습니다.');
      return;
    }
    if (auth) {
      console.log('회원 가입 성공', auth);
      dispatch(check());
    }
  }, [ auth, authError, dispatch ]);

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('localstorage Error');
      }
    }
  }, [ navigate, user ]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
