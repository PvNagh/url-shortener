import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Spinner = () =>{
    return (
      <div
        className="flex justify-center items-center h-screen"
      >
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#0047ab"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

export default Spinner;