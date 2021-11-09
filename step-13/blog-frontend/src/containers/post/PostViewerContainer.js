import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import { readPost, unloadPost } from '../../modules/post';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post   : post.post,
    error  : post.error,
    loading: loading['post/READ_POST'],
    user   : user.user,
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => dispatch(unloadPost());
  }, [ dispatch, postId ]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const ownPost = !!user?._id === !!post?.user._id;

  return <PostViewer
    post={post}
    error={error}
    loading={loading}
    actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}
  />;
};

export default PostViewerContainer;
