import { useState, useRef, useEffect, useCallback } from 'react';

export default (...props) => {
  const isUnmount = useRef(false);
  const [state, setState] = useState(...props);
  useEffect(() => {
    return () => {
      isUnmount.current = true;
    };
  }, []);

  const setSafeState = useCallback((...props) => {
    if (isUnmount.current === false) {
      setState(...props);
    }
  }, [setState]);

  return [state, setSafeState];
};
