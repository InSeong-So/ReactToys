import { createContext, useContext } from 'react';

// 클라이언트 환경 : null
// 서버 환경 : { done: false, promise:[] }
const PreloadContext = createContext(null);
export default PreloadContext;

// resolve는 함수 타입
export const Preloader = ({ resolve }) => {
  const preloadContext = useContext(PreloadContext);
  if(!preloadContext) return null;  // context 값이 유효하지 않으면 실행 x
  if(preloadContext.done) return null;  // 이미 작업이 종료되었다면 아무것도 실행하지 않음

  // promises 배열에 프로미스 등록
  // resolve 함수가 프로미스를 반환하지 않아도 프로미스로 취급하기 위해 Promise.resove 함수 사용
  preloadContext.promises.push(Promise.resolve(resolve()));
  return null;
};

// Hook 형태로 사용할 수 있는 함수
export const usePreloader = (resolve) => {
  const preloadContext = useContext(PreloadContext);
  if(!preloadContext) return null;
  if(preloadContext.done) return null;
  preloadContext.promises.push(Promise.resolve(resolve()));
};