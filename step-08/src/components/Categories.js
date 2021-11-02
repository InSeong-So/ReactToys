import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
  {
    name: 'all',
    text: '전체보기'
  },
  {
    name: 'business',
    text: '비즈니스'
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트'
  },
  {
    name: 'health',
    text: '건강'
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠'
  },
  {
    name: 'technology',
    text: '기술'
  }
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px){
    width: 100%;
    overflow-x: auto;
  }
`;

// HTML 요소가 아닌 특정 컴포넌트에 styeld-components를 사용할 때 이렇게 씁니다.
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover{
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

const Categories = ({ category, onSelect }) => {
  return (
    <CategoriesBlock>
      {categories.map(({ name, text }) => (
        <Category
          key={name}
          activeClassName="active"
          // to 값이 '/'를 가리키면 exact 값을 true로 바꿔줍니다.
          // 이를 설정하면 다른 카테고리 선택 시에도 전체보기 링크에 active 스타일이 적용됩니다.
          exact={name === "all"}
          to={name === 'all' ? '/' : `/${name}`}
        >{text}</Category>
      ))}
    </CategoriesBlock>
  )
}

export default Categories
