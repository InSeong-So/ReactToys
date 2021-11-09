import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const StyledEditor = styled(Responsive)`
  // 페이지 위 아래 여백 지정하기
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border:none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  // 최소 크기 지정 및 padding 제거
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  .ql-editor.ql-blank::before{
    left: 0px;
  }
`;

const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null);  // Quill 적용할 DivElement
  const quillInstance = useRef(null);  // Quill 인스턴스

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme      : 'bubble',
      placeholder: '내용을 입력해주세요.',
      modules    : {
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [ 'bold', 'italic', 'underline', 'strike' ],        // toggled buttons
          [ 'blockquote', 'code-block' ],
          [ { 'header': 1 }, { 'header': 2 } ],               // custom button values
          [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
          [ { 'script': 'sub' }, { 'script': 'super' } ],      // superscript/subscript
          [ { 'indent': '-1' }, { 'indent': '+1' } ],          // outdent/indent
          [ { 'direction': 'rtl' } ],                         // text direction
          [ { 'size': [ 'small', false, 'large', 'huge' ] } ],  // custom dropdown
          [ { 'header': [ 1, 2, 3, 4, 5, 6, false ] } ],
          [ { 'color': [] }, { 'background': [] } ],          // dropdown with defaults from theme
          [ { 'font': [] } ],
          [ { 'align': [] } ],
          [ 'clean' ],    
        ],
      },
    });
    // quill text-change 이벤트 핸들러 등록
    // 참고 : https://quilljs.com/docs/api#events
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if(source === 'user'){
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [ onChangeField ]);

  const onChangeTitle = ({ target }) => {
    onChangeField({ key: 'title', value: target.value });
  };

  const mounted = useRef(false);
  useEffect(() => {
    if(mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [ body ]);

  return (
    <StyledEditor>
      <TitleInput
        placeholder="제목을 입력하세요."
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </StyledEditor>
  );
};

export default Editor;
