"use client";
import React, { useEffect } from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";
import PageFive from "./PageFive";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "@/redux/store";

interface RootState {
  page: {
    pageNumber: number;
    loaded: boolean;
  };
  form: {
    checkboxes: string[];
    age: number;
    job: string;
    postal: string;
    name: string;
    surname: string;
    email: string;
    telephone: string;
  };
}

const Survey = () => {
  const pageNumber = useSelector((state: RootState) => state.page.pageNumber);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "Dane w formularzu zostaną utracone, czyc chesz kontynuować?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  let form;

  switch (pageNumber) {
    case 0:
      form = <PageOne />;
      break;
    case 1:
      form = <PageTwo />;
      break;
    case 2:
      form = <PageThree />;
      break;
    case 3:
      form = <PageFour />;
      break;
    case 4:
      form = <PageFive />;
      break;
    default:
      form = <div>Błąd formularza. Proszę odświeżyć stronę.</div>;
  }

  return (
    <Provider store={store}>
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="flex flex-col justify-center items-center space-y-2 sm:w-full md:w-[500px] mx-auto">
          {form}
        </div>
      </div>
    </Provider>
  );
};

export default Survey;
