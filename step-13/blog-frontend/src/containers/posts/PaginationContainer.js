import QueryString from 'qs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {
  const params = useParams();
  const { search } = useLocation();
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts   : posts.posts,
    loading : loading['post/LIST_POSTS'],
  }));

  if (!posts || loading) return null;

  const { username } = params;

  // 페이지가 없다면 기본 1
  const { tag, page = 1 } = QueryString.parse(search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={tag}
      username={username}
      page={+page}
      lastPage={lastPage}
    />
  );
};

export default PaginationContainer;
