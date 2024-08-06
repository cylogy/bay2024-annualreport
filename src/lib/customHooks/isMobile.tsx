import { useState, useEffect } from "react";

const useIsMobile = (breakpoint: number) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.matchMedia(
        `(max-width: ${breakpoint ? `${breakpoint}px` : "768px"})`
      ).matches;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
