import { useState, useEffect } from 'react';

const usePromise = (promiseCreator, deps) => {
  // 대기 중/완료/실패 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [rejected, setRejected] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (error) {
        setRejected(error);
      }
      setLoading(false);
    }
    process();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, rejected];
}

export default usePromise;