## React 백지 코딩 저장소
> step만 따라오면 당신도 React 마스터!

<br>
<hr>
<br>

## 저장소 사용 방법
- 자동완성 사용하지 않고, 책/인터넷 참조하지 않고 순수 손으로 작성해보기
- 이해하여 손으로 아키텍쳐를 그리고, 논리 구성이 가능할 때까지 계속 반복

<br>

## 공통 라이브러리
### create-react-app으로 프로젝트를 시작하는 경우
- npm init으로 시작하면 react-scripts를 제외한 react, react-dom

<br>

<table>
  <thead>
    <th>라이브러리</th> 
    <th>기능</th> 
  </thead>
  <tbody>
    <tr>
      <td>react</td>
      <td><strong>View</strong>를 만들기 위한 라이브러리</td>
    </tr>
    <tr>
      <td>react-dom</td>
      <td><strong>UI</strong>를 렌더링하기 위한 라이브러리</td>
    </tr>
    <tr>
      <td>react-scripts</td>
      <td><strong>create-react-app</strong>으로 생성 시 React를 제어할 수 있는 스크립트 라이브러리</td>
    </tr>
  </tbody>
</table>

<br>

### Webpack Build 사용 시

<br>

<table>
  <thead>
    <th>라이브러리</th> 
    <th>기능</th> 
  </thead>
  <tbody>
    <tr>
      <td>@babel/cli</td>
      <td>-</td>
    </tr>
    <tr>
      <td>@babel/core</td>
      <td>-</td>
    </tr>
    <tr>
      <td>@babel/preset-env</td>
      <td>-</td>
    </tr>
    <tr>
      <td>@babel/preset-react</td>
      <td>-</td>
    </tr>
    <tr>
      <td>babel-loader</td>
      <td>-</td>
    </tr>
    <tr>
      <td>babel-plugin-react-transform</td>
      <td>-</td>
    </tr>
    <tr>
      <td>webpack</td>
      <td>-</td>
    </tr>
    <tr>
      <td>webpack-cli</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

<br>

### Node.js로 간이 서버를 같이 운용하는 경우

<br>

<table>
  <thead>
    <th>프레임워크</th> 
    <th>기능</th> 
  </thead>
  <tbody>
    <tr>
      <td rowspan="4" align="center">Express</td>
      <td>HTTP 통신 요청(Request; GET, POST, DELETE 등)에 대한 핸들러를 만든다.</td>
    </tr>
    <tr>
      <td>템플릿에 데이터를 넣어 응답(response)을 만들기 위해 view의 렌더링 엔진과 결합(integrate)한다.</td>
    </tr>
    <tr>
      <td>접속을 위한 포트나 응답 렌더링을 위한 템플릿 위치같은 공통 웹 어플리케이션 세팅을 한다.</td>
    </tr>
    <tr>
      <td>핸들링 파이프라인(reqest handling pipeline) 중 필요한 곳에 추가적인 미들웨어 처리 요청을 추가한다.</td>
    </tr>
  </tbody>
</table>

<br>

## 과정
### step-00 [디렉토리 Link](https://github.com/InSeong-So/ReactToys/tree/main/step-00)
- 개요 : 생활코딩 React 강의로 React 기초 개념 공부
- 라이브러리 : 상단 공통 라이브러리 참조

<br>

### step-01 [디렉토리 Link](https://github.com/InSeong-So/ReactToys/tree/main/step-01)
- 개요 : step-00을 백지 코딩하면서 기초 개념 숙달
- 라이브러리 : 위와 동일

<br>

### step-02 [디렉토리 Link](https://github.com/InSeong-So/ReactToys/tree/main/step-02)
- 개요 : step-00의 응용 1, 게시판 구현
- 라이브러리

  |라이브러리|용도|사용처|
  |---------|----|------|
  |nedb|DB 설치 없이 파일 형태로 DB처럼 사용하는 라이브러리|Back|
  |axios|Promise API 기반 HTTP 비동기 통신 라이브러리|Front|

<br>

### step-03 [디렉토리 Link](https://github.com/InSeong-So/ReactToys/tree/main/step-03)
- 개요 : step-00의 응용 2, Socket-IO를 이용한 실시간 채팅 구현(Socket-IO 버전이 상이하므로 이 차이점을 공부해보자)
- 라이브러리

  |라이브러리|용도|사용처|
  |---------|----|------|
  |nedb|DB 설치 없이 파일 형태로 DB처럼 사용하는 라이브러리||Back|
  |socketio|WebSocket을 기반으로 클라이언트와 서버의 양방향 통신을 위한 라이브러리|Back|
  |axios|Promise API 기반 HTTP 비동기 통신 라이브러리|Front|
  |socket.io-client|클라이언트를 초기화하여 서버쪽과 유기적인 통신이 가능하게 하는 라이브러리|Front|

<br>

### step-04 [디렉토리 Link](https://github.com/InSeong-So/ReactToys/tree/main/step-04)
- 개요 : step-00의 응용 3, SNS 구현하기
- 라이브러리

  |라이브러리|용도|사용처|
  |---------|----|------|
  |nedb|DB 설치 없이 파일 형태로 DB처럼 사용하는 라이브러리||Back|
  |axios|Promise API 기반 HTTP 비동기 통신 라이브러리|Front|
  |react-router-dom|React의 화면 전환을 도와주는 라이브러리|Front|

<br>

### step-05 [디렉토리 Link](https://github.com/InSeong-So/ReactToys/tree/main/step-05)
- 개요 : Vanilla JS를 접목시켜 생각하기, 소규모 단위 컴포넌트를 구현하고 이를 순수 JavaScript로만 구현
- 라이브러리 : 상단 공통 라이브러리 참조

<br>

## 결과
- step-01 [X] 완료 일시 : 2021.08.19
  - CRUD 구현 미숙
  - state와 props의 효율적인 운용은 어떻게 해야 하는가?
  - 이벤트 핸들링이 너무 복잡하다.
  - 리팩토링을 하지 못했다.

<br>