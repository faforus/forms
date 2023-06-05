import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/page-slice";
import { updateField } from "@/redux/form-slice";
import Select from "react-select";
import { StylesConfig } from "react-select";

const jobOptions = [
  { value: "Financial Analyst", label: "Financial Analyst" },
  { value: "Equity Trader", label: "Equity Trader" },
  { value: "Investment Banker", label: "Investment Banker" },
  { value: "Risk Manager", label: "Risk Manager" },
  {
    value: "Front-end Developer",
    label: "Front-end Developer",
  },
  {
    value: "Full-stack Developer",
    label: "Full-stack Developer",
  },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "Software Engineer", label: "Software Engineer" },
  {
    value: "React Native Developer",
    label: "React Native Developer",
  },
  { value: "Web Developer", label: "Web Developer" },
  {
    value: "Front-end Architect",
    label: "Front-end Architect",
  },
  {
    value: "TypeScript Developer",
    label: "TypeScript Developer",
  },
  {
    value: "Quality Assurance Engineer",
    label: "Quality Assurance Engineer",
  },
  { value: "Technical Writer", label: "Technical Writer" },
];

type JobOption = {
  value: string;
  label: string;
};

type FormState = {
  sliderOne: number;
  sliderTwo: number;
  job: string;
  age: number;
  postal: string;
};

type RootState = {
  form: FormState;
  page: {
    pageNumber: number;
    loaded: boolean;
  };
};

const PageTwo = () => {
  const [jobError, setJobError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [postalError, setPostalError] = useState(false);
  const form = useSelector((state: RootState) => state.form);
  const loaded = useSelector((state: RootState) => state.page.loaded);
  const pageNumber = useSelector((state: RootState) => state.page.pageNumber);
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string | null
  ) => {
    if (typeof e === "string") {
      const field = "job";
      const value = e;
      dispatch(updateField({ field, value }));
    } else if (e !== null) {
      const field = e.target.name as keyof FormState;
      const value = e.target.value;
      dispatch(updateField({ field, value }));
    }
  };

  const validatePageTwo = () => {
    if (validatePageTwoHelper()) {
      if (pageNumber === 1 && loaded === true) {
        dispatch(pageActions.nextPage());
        dispatch(pageActions.nextPage());
      } else {
        dispatch(pageActions.nextPage());
      }
    }
  };

  const validatePageTwoHelper = () => {
    if (!form.job) {
      setJobError(true);
      return false;
    } else {
      setJobError(false);
    }

    if (form.age < 15 || form.age > 99) {
      setAgeError(true);
      return false;
    } else {
      setAgeError(false);
    }

    const postalRegex = /^\d{2}-\d{3}$/;
    if (!postalRegex.test(form.postal)) {
      setPostalError(true);
      return false;
    } else {
      setPostalError(false);
    }

    return true;
  };

  const colourStyles: StylesConfig<JobOption> = {
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#f4f6f8" : "#f4f6f8",
        borderColor: isFocused ? "#f7ab0a" : styles.borderColor,
        boxShadow: isFocused ? "0 0 0 1px #f7ab0a" : styles.boxShadow,
        color: isFocused ? styles.color : "white",
        "&:hover": {
          borderColor: isFocused ? "#f7ab0a" : styles.borderColor,
        },
      };
    },
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isFocused || isSelected
          ? "#f7ab0a"
          : undefined,
        color: isDisabled ? "#ccc" : isSelected ? "white" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled ? "#f7ab0a" : undefined,
        },
      };
    },
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col">
        <label>xxx</label>
        <input
          className="rounded-md appearance-none cursor-pointer bg-gray-200 mainColor"
          name="sliderOne"
          value={form.sliderOne}
          onChange={handleChange}
          type="range"
          min={15000}
          max={3000000}
          step={15000}
        />
        <p>{form.sliderOne}</p>
      </div>
      <div className="flex flex-col">
        <label>xxx</label>
        <input
          className="rounded-md appearance-none cursor-pointer bg-gray-200 mainColor"
          name="sliderTwo"
          value={form.sliderTwo}
          onChange={handleChange}
          type="range"
          min={15000}
          max={3000000}
          step={15000}
        />
        <p>{form.sliderTwo}</p>
      </div>
      <div className="flex flex-col react-select">
        <label htmlFor="jobSelect">Zawód:</label>
        <Select
          styles={colourStyles}
          options={jobOptions}
          placeholder="Wybierz Zawód"
          value={form.job ? { value: form.job, label: form.job } : null}
          onChange={(selectedOption) => {
            const value = selectedOption
              ? (selectedOption as JobOption).value
              : "";
            dispatch(updateField({ field: "job", value }));
          }}
        />
        {jobError ? <p className="text-red-500">Proszę wybrać zawód.</p> : ""}
      </div>
      <div className="flex flex-col">
        <label>Wiek</label>
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          className="formInput"
          type="number"
          min={0}
          max={100}
        ></input>
        {ageError ? (
          <p className="text-red-500">
            Wiek powinien być liczbą w zakresie 15-99.
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col">
        <label>Kod pocztowy</label>
        <input
          name="postal"
          value={form.postal}
          onChange={handleChange}
          className="formInput"
          type="text"
        ></input>
        {postalError ? (
          <p className="text-red-500">
            Kod pocztowy powinien mieć format XX-XXX.
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-2">
        <button
          onClick={() => {
            dispatch(pageActions.prevPage());
          }}
          className="backButtonColor py-2 md:py-3 px-10 rounded-md text-black font-bold text-base w-[19%]"
        >
          ‹
        </button>
        <button
          onClick={validatePageTwo}
          className="mainColor py-2 md:py-3 px-10 rounded-md text-black font-bold text-base w-[80%]"
        >
          ›››
        </button>
      </div>
    </div>
  );
};

export default PageTwo;
