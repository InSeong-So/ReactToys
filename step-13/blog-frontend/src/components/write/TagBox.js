import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledTagBox = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};

  h4{
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]};
  input, button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }

  button {
    cursor:pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;
    background: ${palette.gray[8]};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

// React.memo로 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

// React.memo를 사용해 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
  const [ input, setInput ] = useState('');
  const [ localTags, setLocalTags ] = useState([]);

  const insertTag = useCallback((tag) => {
    if (!tag) return;
    if (localTags.includes(tag)) return;
    const nextTags = [ ...localTags, tag ];
    setLocalTags([ ...localTags, tag ]);
    onChangeTags(nextTags);
  }, [ localTags, onChangeTags ]);

  const onRemove = useCallback((tag) => {
    const nextTags = localTags.filter(t => t!== tag);
    setLocalTags(nextTags);
    onChangeTags(nextTags);
  }, [ localTags, onChangeTags ]);

  const onChange = useCallback(({ target }) => {
    setInput(target.value);
  }, []);

  const onSubmit = useCallback((event) => {
    event.preventDefault();
    insertTag(input.trim());
    setInput('');
  }, [ input, insertTag ]);

  useEffect(() => {
    setLocalTags(tags);
  }, [ tags ]);

  return (
    <StyledTagBox>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 입력해주세요."
          value={input}
          onChange={onChange}
        />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove}/>
    </StyledTagBox>
  );
};

export default TagBox;
