import { useState, useEffect } from "react";

export const useIsResized = (width: number) => {
  const [isResized, setIsResized] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResized(window.innerWidth <= width);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  return { isResized };
};
