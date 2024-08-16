import React from 'react';

export default function ObjectiveTiles() {
  return (
    <div>
      <h2 className="text-dark-blue pb-[12px]">Overview</h2>
      <p className="p1 text-dark-blue">
        Our Achieve Impact goal is centered around sed faucibus turpis in eu mi bibendum neque. Sem
        fringilla ut morbi tincidunt augue. This goal has 3 primary objectives, each containing 2-4
        strategies that will be tracked with action plans, performance metrics, and progress
        reports. The 3 objectives are:
      </p>
      <section className="pt-[100px]">
        <div className="">
          <span className="bullet-number relative w-[267px] h-[290px] rounded-[40px] bg-powder-blue overflow-hidden flex flex-col items-center text-white justify-center px-[36px] py-[36px] pb-[48px] text-center">
            <span className="block h1 font-newsreader">1</span>
            <span className="h6">Reduce Health Impacts of Air Pollution</span>
            <div className="absolute bottom-0">
              <svg
                width="267"
                height="35"
                viewBox="0 0 267 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M317.5 1.60711V35H-51.5V0C14.5081 5.75871 84.7074 10.1358 143.822 10.1358C195.395 10.1358 256.983 6.51455 317.5 1.60711Z"
                  fill="#B6D158"
                />
              </svg>
            </div>
          </span>
        </div>
      </section>
    </div>
  );
}
