// import { RecoilRoot as GlobalState } from 'recoil';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import { BrowserRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

const loadUser = () => {
  try {
    const user = localStorage.getItem('user');
    if(!user) return;
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (error) {
    console.log('localstorage Error');
  }
};

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        {/* <GlobalState> */}
        <App />
        {/* </GlobalState> */}
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);