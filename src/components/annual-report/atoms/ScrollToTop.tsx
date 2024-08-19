import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the scroll event
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top
  const handleScrollToTop = () => {
    const scrollDuration = 600; // Duration of the scroll animation in milliseconds
    const scrollStep = -window.scrollY / (scrollDuration / 15); // Calculate the scroll step

    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep); // Scroll the page by the calculated step
        requestAnimationFrame(scrollAnimation); // Recursively call the function until the top is reached
      }
    };

    requestAnimationFrame(scrollAnimation); // Start the scroll animation
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={handleScrollToTop}
      className={`bg-powder-blue rounded-[100%] w-[70px] h-[70px] boxShadow fixed bottom-[10px] right-[10px] md:bottom-[100px] md:right-[100px] z-[999] text-white flex flex-col gap-[5px] items-center justify-center cursor-pointer transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }} // Disable interaction when not visible
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.36577 0.125074C9.16135 0.204429 8.9746 0.323423 8.81622 0.475221L0.489749 8.81202C0.334479 8.96748 0.211313 9.15204 0.127282 9.35516C0.0432504 9.55828 -4.46906e-07 9.77599 -4.37296e-07 9.99584C-4.17887e-07 10.4399 0.176168 10.8657 0.489749 11.1797C0.645018 11.3351 0.82935 11.4584 1.03222 11.5426C1.23509 11.6267 1.45252 11.67 1.67211 11.67C2.11558 11.67 2.54089 11.4936 2.85447 11.1797L8.33328 5.67738L8.33329 18.3326C8.33329 18.7749 8.50874 19.199 8.82104 19.5116C9.13334 19.8243 9.55692 20 9.99858 20C10.4402 20 10.8638 19.8243 11.1761 19.5116C11.4884 19.199 11.6639 18.7749 11.6639 18.3326L11.6639 5.67738L17.1427 11.1797C17.2975 11.3359 17.4817 11.46 17.6846 11.5446C17.8875 11.6293 18.1052 11.6729 18.325 11.6729C18.5449 11.6729 18.7626 11.6293 18.9655 11.5446C19.1684 11.46 19.3526 11.3359 19.5074 11.1797C19.6635 11.0247 19.7874 10.8403 19.8719 10.6371C19.9565 10.4339 20 10.216 20 9.99584C20 9.77573 19.9565 9.5578 19.8719 9.35461C19.7874 9.15143 19.6635 8.96702 19.5074 8.81202L11.1809 0.475221C11.0226 0.323423 10.8358 0.204429 10.6314 0.125074C10.226 -0.0416932 9.7712 -0.0416932 9.36577 0.125074Z"
          fill="white"
        />
      </svg>
      <span className="text-[0.75rem] font-bold font-montserrat">To top</span>
    </div>
  );
};

export default ScrollToTop;
