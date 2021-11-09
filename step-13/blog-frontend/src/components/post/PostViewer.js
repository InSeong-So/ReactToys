import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const StyledPostViewer = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {

  if (!post || loading) return null;

  if (error) {
    if (error.response?.status === 404) {
      return <StyledPostViewer>존재하지 않는 포스트입니다.</StyledPostViewer>;
    }
    return <StyledPostViewer>오류가 발생했습니다.</StyledPostViewer>;
  }

  const { title, body, user, publishedDate, tags } = post;

  return (
    <StyledPostViewer>
      <Helmet>
        <title>{title} - Reacters</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop
        />
        <Tags tags={tags} />
      </PostHead>
      {actionButtons}
      <PostContent
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </StyledPostViewer>
  );
};

export default PostViewer;
