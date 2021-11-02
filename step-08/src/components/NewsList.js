import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsItem from './NewsItem';
import usePromise from '../hooks/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px){
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// const dummyArticle = {
//   title: '제목',
//   descrtiption: '내용',
//   url: 'https://google.com',
//   urlToImage: 'https://via.placeholder.com/160',
// }


const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=e1f5b8cfdf2a45e8bb4ee737f47c762b`);
  }, [category]);

  if (loading) return <NewsListBlock>대기 중!</NewsListBlock>
  if (!response) return null;
  if (error) return <NewsListBlock>에러가 발생했습니다. 사유 : {error}</NewsListBlock>;

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article}></NewsItem>
      ))}
    </NewsListBlock>
  )
}

export default NewsList
