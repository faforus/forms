import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageActions } from "@/redux/page-slice";
import { updateField } from "@/redux/form-slice";
import isEmail from "validator/es/lib/isEmail";

type FormState = {
  name: string;
  surname: string;
  email: string;
  telephone: string;
};

type RootState = {
  form: FormState;
  page: {
    pageNumber: number;
    loaded: boolean;
  };
};

const PageFour = () => {
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const form = useSelector((state: RootState) => state.form);
  const pageNumber = useSelector((state: RootState) => state.page.pageNumber);
  const loaded = useSelector((state: RootState) => state.page.loaded);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof FormState;
    const value = e.target.value;
    dispatch(updateField({ field, value }));
  };

  const validatePageFour = () => {
    if (validatePageFourHelper()) {
      dispatch(pageActions.nextPage());
    }
  };

  const validatePageFourHelper = () => {
    if (form.name.trim().length < 2) {
      setNameError(true);
      return false;
    } else {
      setNameError(false);
    }

    if (form.surname.trim().length < 2) {
      setSurnameError(true);
      return false;
    } else {
      setSurnameError(false);
    }

    if (!isEmail(form.email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
    }

    if (form.telephone.length < 7 || !/^[0-9+\-\s]+$/.test(form.telephone)) {
      setTelephoneError(true);
      return false;
    } else {
      setTelephoneError(false);
    }

    return true;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col">
        <label>Imię</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="formInput"
          type="text"
          min={0}
          max={100}
        ></input>
        {nameError ? <p className="text-red-500">Proszę podać imię.</p> : ""}
      </div>
      <div className="flex flex-col">
        <label>Nazwisko</label>
        <input
          name="surname"
          value={form.surname}
          onChange={handleChange}
          className="formInput"
          type="text"
          min={0}
          max={100}
        ></input>
        {surnameError ? (
          <p className="text-red-500">Proszę podać nazwisko.</p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col">
        <label>E-mail</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="formInput"
          type="email"
          min={0}
          max={100}
        ></input>
        {emailError ? (
          <p className="text-red-500">Adres email jest nieprawidłowy.</p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col">
        <label>Telefon</label>
        <input
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          className="formInput"
          type="tel"
          min={0}
          max={100}
        ></input>
        {telephoneError ? (
          <p className="text-red-500">Proszę podać poprawny numer telefonu.</p>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-row w-full items-center justify-between mt-2">
        <button
          onClick={() => {
            if (pageNumber === 3 && loaded === true) {
              dispatch(pageActions.prevPage());
              dispatch(pageActions.prevPage());
            } else {
              dispatch(pageActions.prevPage());
            }
          }}
          className="backButtonColor py-2 md:py-3 px-10 rounded-md text-black font-bold text-base w-[19%]"
        >
          ‹
        </button>
        <button
          onClick={validatePageFour}
          className="mainColor py-2 md:py-3 px-10 rounded-md text-black font-semibold text-base w-[80%]"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default PageFour;
