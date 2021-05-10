// simple1.js 코드를 jsx 문법으로 작성하기
// className = class : JavaScript는 class가 예약어이므로 이렇게 사용한다.
// Title : 컴포넌트를 렌더링하고 있으므로 비슷한 방식으로 입력한 것
// 기본적으로 하이픈으로 입력하는게 아니라 (JavaScript는 하이픈을 마이너스로 인식) 카멜케이스를 사용해야 한다.

<div className="box">
    <Title text="hello world" width={200} />
    <button onClick={() => { }}>좋아요</button>
    <a href="/home" style={{ marginTop: '10px', color: 'red' }}>
        홈으로 이동
    </a>
</div>