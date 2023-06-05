import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import isEmail from "validator/lib/isEmail";

type AgentRegisterProps = {
  setAgentRegister: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormValues {
  firstName: string;
  lastName: string;
  rauNumber: string;
  phoneNumber: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  agreeOWU: boolean;
  agreeProcessing: boolean;
}

export default function AgentRegister(props: AgentRegisterProps) {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    rauNumber: "",
    phoneNumber: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    agreeOWU: false,
    agreeProcessing: false,
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.firstName || values.firstName.trim().length < 2) {
      errors.firstName = "Proszę podać imię";
    }
    if (!values.lastName || values.lastName.trim().length < 2) {
      errors.lastName = "Proszę podać nazwisko";
    }
    if (!values.rauNumber) {
      errors.rauNumber = "Proszę podać numer xxx";
    }
    if (
      !values.phoneNumber ||
      !/^[0-9+\-\s]+$/.test(values.phoneNumber) ||
      values.phoneNumber.replace(/[\s+\-]/g, "").length < 9
    ) {
      errors.phoneNumber = "Proszę podać numer telefonu";
    }
    if (!values.email || !isEmail(values.email)) {
      errors.email = "Proszę podać adres email";
    }
    if (values.confirmEmail !== values.email) {
      errors.confirmEmail = "Adres email się nie zgadza";
    }
    if (!values.password) {
      errors.password = "Proszę podać hasło";
    } else if (
      values.password.length < 8 ||
      !/[!@#$%^&*]/.test(values.password)
    ) {
      errors.password =
        "Hasło musi mieć co najmniej 8 znaków i zawierać co najmniej jeden znak specjalny (!@#$%^&*)";
    }
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Hasło się nie zgadza";
    }
    if (!values.agreeOWU) {
      errors.agreeOWU = true;
    }
    if (!values.agreeProcessing) {
      errors.agreeProcessing = true;
    }
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateForm}
    >
      {({ isValid, dirty }) => (
        <Form className="w-[400px] space-y-1">
          <div className="divForm">
            <label htmlFor="firstName">Imię:</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage
              className="errorMessage"
              name="firstName"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="lastName">Nazwisko:</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage
              className="errorMessage"
              name="lastName"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="rauNumber">Numer XXX:</label>
            <Field type="text" id="rauNumber" name="rauNumber" />
            <ErrorMessage
              className="errorMessage"
              name="rauNumber"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="phoneNumber">Telefon Komórkowy:</label>
            <Field type="text" id="phoneNumber" name="phoneNumber" />
            <ErrorMessage
              className="errorMessage"
              name="phoneNumber"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="email">E-mail:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              className="errorMessage"
              name="email"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="confirmEmail">Powtórz e-mail:</label>
            <Field type="email" id="confirmEmail" name="confirmEmail" />
            <ErrorMessage
              className="errorMessage"
              name="confirmEmail"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="password">Hasło:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              className="errorMessage"
              name="password"
              component="div"
            />
          </div>
          <div className="divForm">
            <label htmlFor="confirmPassword">Powtórz hasło:</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorMessage
              className="errorMessage"
              name="confirmPassword"
              component="div"
            />
          </div>
          <div className="checkbox">
            <label>
              <Field type="checkbox" name="agreeOWU" />
              Oświadczam. że zapoznałem się z...
            </label>
            <ErrorMessage
              className="errorMessage"
              name="agreeOWU"
              component="div"
            />
          </div>
          <div>
            <label className="checkbox">
              <Field type="checkbox" name="agreeProcessing" />
              Wyrażam zgodę na...
            </label>
            <ErrorMessage
              className="errorMessage"
              name="agreeProcessing"
              component="div"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-[#f7ab0a] py-2 md:py-3 px-10 rounded-md text-black font-semibold text-base disabled:bg-slate-400 w-full mr-1"
              type="submit"
              disabled={!isValid || !dirty}
            >
              Zarejestruj
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.setAgentRegister(false);
              }}
              className="bg-[#f7ab0a] py-2 md:py-3 px-10 rounded-md text-black font-semibold text-base"
            >
              Wróć
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
