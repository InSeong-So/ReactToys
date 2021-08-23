# node-react 게시판 작성

## 사용 라이브러리
1. axios : http 통신 라이브러리
2. express : node 백엔드를 구축하기 위한 라이브러리
3. react, react-dom : react 프로젝트를 위한 라이브러리
4. babel, webpack : 빌드를 위한 라이브러리

## 알게 된 것
1. babel은 7버전부터 babel-preset-es2015가 deprecated 되어서, @babel/preset-env를 사용해야 웹팩 빌드를 정상적으로 실행할 수 있다.
2. 라이프사이클 componentWillMount()는 deprecated 되었다. 대체제로는 getDerivedStateFromProps()가 있으나, 성질이 좀 다르다.
3. render() 함수에 state를 변경하는 loadLogs()를 가져오면 무한 루프가 발생한다. 이를 막기 위한 방법...은 몇 개가 있을까?
4. 스타일을 지정하기 위해서는 각 컴포넌트 별 파일을 생성하는게 유지보수에 효율적일 것 같다.