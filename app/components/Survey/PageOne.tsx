import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/page-slice";
import { updateField } from "@/redux/form-slice";
import { OPTIONS, ADDITIONAL_OPTIONS } from "./survey_options";

type FormState = {
  checkboxes: string[];
};

type RootState = {
  form: FormState;
  page: {
    pageNumber: number;
    loaded: boolean;
  };
};

const PageOne = () => {
  const [checkboxesError, setCheckboxesError] = useState(false);
  const checkboxes = useSelector((state: RootState) => state.form.checkboxes);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const item = event.target.name;
    const isChecked = event.target.checked;
    const newCheckboxes = isChecked
      ? [...checkboxes, item]
      : checkboxes.filter((checkbox) => checkbox !== item);
    dispatch(updateField({ field: "checkboxes", value: newCheckboxes }));
  };

  const validateForm = () => {
    const isValid = OPTIONS.some((option) => checkboxes.includes(option));

    if (!isValid) {
      setCheckboxesError(true);
    } else {
      dispatch(pageActions.nextPage());
    }
  };

  return (
    <div className="flex flex-col w-full items-center space-y-4">
      <div>
        <div className="flex flex-col w-[90%] whitespace-nowrap">
          <h2 className="text-xl font-bold mb-2">Pola wymagane:</h2>
          {OPTIONS.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={option}
                name={option}
                checked={checkboxes.includes(option)}
                onChange={handleChange}
                className="h-4 w-4 border-red-300 mainColor2 focus:ring-red-200"
              />
              <label htmlFor={option} className="text-md">
                {option}
              </label>
            </div>
          ))}
        </div>
        {checkboxesError ? (
          <p className="text-red-500">
            Proszę wybrać co najmniej jedną odpowiedź.
          </p>
        ) : null}

        <div>
          <h2 className="text-xl font-bold mb-2">Pola dodatkowe:</h2>
          {ADDITIONAL_OPTIONS.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={option}
                name={option}
                checked={checkboxes.includes(option)}
                onChange={handleChange}
                className="h-4 w-4 border-red-300 mainColor2 focus:ring-red-200"
              />
              <label htmlFor={option} className="text-sm">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row w-full items-center justify-between mt-2">
        <button
          onClick={validateForm}
          className="mainColor py-2 px-10 rounded-md text-black font-bold text-lg w-full"
        >
          ›››
        </button>
      </div>
    </div>
  );
};

export default PageOne;
