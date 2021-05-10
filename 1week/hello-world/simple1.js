function LikeButton() {
    const [liked, setLiked] = React.useState(false);
    const text = liked ? '좋아요 취소' : '좋아요';
    return React.createElement(
        'button',
        { onClick: () => setLiked(!liked) },
        text,
    );
}

// DOM이 반복되는 여러개일 경우에도
{/* <h2>root1</h2>
<div id="root1"></div>
<h2>root2</h2>
<div id="root2"></div>
<h2>root3</h2>
<div id="root3"></div> */}

// const domContainer1 = document.getElementById('root1');
// ReactDOM.render(React.createElement(LikeButton), domContainer1);
// const domContainer2 = document.getElementById('root2');
// ReactDOM.render(React.createElement(LikeButton), domContainer2);
// const domContainer3 = document.getElementById('root3');
// ReactDOM.render(React.createElement(LikeButton), domContainer3);

// 이렇게 작성하면 된다.
{/* <h2>root</h2>
<div id="root"></div>*/}

const domContainer1 = document.getElementById('root');
ReactDOM.render(
    React.createElement(
        'div',
        null,
        React.createElement(LikeButton),
        React.createElement(LikeButton),
        React.createElement(LikeButton),
    ),
    domContainer1
);



// 아래처럼 구현된다.
{/* <div>
    <p>hello</p>
    <p>world</p>
</div>

React.createElement(
    'div',
    null,
    React.createElement('p', null, 'hello'),
    React.createElement('p', null, 'world'),
) */}