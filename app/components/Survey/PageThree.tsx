import React from "react";
import Spinner from "../Spinner";
import { pageActions } from "@/redux/page-slice";
import { useDispatch } from "react-redux";

const PageThree = () => {
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(pageActions.nextPage());
    dispatch(pageActions.loadingFinished());
  }, 1500);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Spinner />
      <p>XXX</p>
    </div>
  );
};

export default PageThree;
