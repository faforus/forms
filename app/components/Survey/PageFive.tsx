import React from "react";
import { useSelector } from "react-redux";

type FormState = {};

type RootState = {
  form: FormState;
};

const PageFive = () => {
  const data = useSelector((state: RootState) => state.form);

  return (
    <div className="w-full">
      <p className="text-center">XXXXXX</p>
      <button
        onClick={() => {
          console.log(data);
        }}
        className="bg-[green] py-2 md:py-3 px-10 rounded-md text-black font-semibold text-base w-full"
      >
        Wysłano
      </button>
    </div>
  );
};
export default PageFive;
