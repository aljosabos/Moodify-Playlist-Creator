import { useEffect, useRef, useState } from "react";

export const useIsStateChanged = (currentState: number) => {
  const [isStateChanged, setIsStateChanged] = useState<boolean>(false);

  const previousStateRef = useRef<number>();
  const previousState = previousStateRef.current;

  useEffect(() => {
    previousStateRef.current = currentState;
  }, [currentState]);

  useEffect(() => {
    if (previousState !== undefined && previousState !== currentState) {
      setIsStateChanged(true);
    } else {
      setIsStateChanged(false);
    }
  }, [currentState, previousState]);

  return { isStateChanged };
};
