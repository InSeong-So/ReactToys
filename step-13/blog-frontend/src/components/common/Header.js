import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 * Responsive 컴포넌트 속성에 스타일 추가 후 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

/**
 * fixed된 헤더와 컨텐츠 사이를 조절하는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right:1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <StyledHeader>
        <Wrapper>
          <Link to="/" className="logo">Reacters</Link>
          <div className="right">
            {user
              ? (
                <>
                  <UserInfo>{user.username}</UserInfo>
                  <Button onClick={onLogout}>로그아웃</Button>
                </>
              )
              : (
                <Button to="/login">로그인</Button>
              )}

          </div>
        </Wrapper>
      </StyledHeader>
      <Spacer />
    </>
  );
};

export default Header;
