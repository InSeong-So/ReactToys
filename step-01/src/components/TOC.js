import React, { Component } from 'react';

// 지금 App.js는 비효율적인 면을 갖고있다. TOC가 redering되기 위해 필요한 데이터는 state의 contents[]이다.
// 이 내용이 바뀌면 TOC 컴포넌트의 render가 다시 실행 될 것이다. 이 말은 즉슨, 만약 contents가 바뀌지 않는다면 TOC의 render()는 호출될 필요가 없다.
// 그러나 현재 코드에서는 사용자의 모든 act에 TOC의 render()가 실행되고 있다.
// facebook은 이러한 이슈를 방지하기 위해 shouldComponentUpdate()라는 함수를 만들었다. 이 함수의 return이 false라면 react는 그 밑의 render()함수를 읽지 않는다. 

// 또한 shouldComponentUpdate의 매개변수는 newProps, newState로 약속이 되어 있다. 
//  -console.log(newProps, 'A');
//  -console.log(this.props.data, 'B');
// B에서는 render()가 호출되지 못하였기 때문에 state.content[] 값을 그대로 갖고온다.
// 하지만 newProps는 추가된 값까지 가져오는 것을 볼 수 있다. 즉, 전자는 배열값을 가져오지만 후자는 변경값을 갖고온다. 

// 만약 쓸데없는 redering을 막기위해 shouldComponentUpdate를 사용했고, 원본값과 변경값을 비교하여 변경값이 있을 때만 TOC가 render된다는 조건을 추가했다고 치자.
// 이 때, state.contents[]를 push로서 값을 추가했다면 TOC에서 this.props.data를 했을 때 원본 배열에 값을 추가하였기 때문에 shouldComponentUpdate함수 내에 if문으로 조건을 붙일 수 없다.
// 그러나 concat()을 사용한다면 원본값은 두고 그 원본값을 복제하여 변경값을 추가한다음 render()하기 때문에 원본값과 변경값을 비교할 수 있는 환경을 만들 수 있다.
class TOC extends Component {
  shouldComponentUpdate(newProps, newState) {
    // console.log('====> TOC shouldComponentUpdate',
    //   newProps.data,
    //   this.props.data
    // );
    return (this.props.data === newProps.data) ? false : true;
  }
  render() {
    const list = this.props.data.map((item, index) => {
      return (
        // 방법은 여러가지가 있다.
        <li key={item.id}>
          {/* <a href={"/content/" + item.id}
            data-id={item.id}
            onClick={(event) => {
              event.preventDefault();
              this.props.onChangePage(event.target.dataset.id);
            }}>{item.title}</a> */}
          <a href={"/content/" + item.id}
            onClick={function (id, event) {
              event.preventDefault();
              this.props.onChangePage(id);
            }.bind(this, item.id)}>{item.title}</a>
        </li>
      );
    });
    return (
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    )
  }
}

export default TOC;