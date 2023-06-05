"use client";
import React, { useState } from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import isEmail from "validator/es/lib/isEmail";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendingForm, setSendingForm] = useState(false);
  const [formIsSent, setFormIsSent] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();

    if (formIsValid) {
      setError(false);
      setSendingForm(true);
      const url = "https://sendemail-linkchanged.run.app";
      const data = {
        name,
        email,
        subject,
        message,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setSendingForm(false);
          setFormIsSent(true);
        } else {
          throw new Error("Error sending the form.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(true);
        setSendingForm(false);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    let error = "";

    if (message.trim().length < 10) {
      isValid = false;
      error = "Wiadomość musi mieć co najmniej 10 znaków.";
    }

    if (!isEmail(email)) {
      isValid = false;
      error = "Proszę podać prawidłowy adres email.";
    }

    if (name.trim().length < 3) {
      isValid = false;
      error = "Proszę podać imię.";
    }

    setFormIsValid(isValid);
    setErrorMessage(error);
  };

  return (
    <div className="flex relative overflow-hidden flex-col text-left md:flex-row max-w-7x px-10 justify-evenly mx-auto items-center">
      <div className="flex flex-col space-y-10">
        <div className="space-y-2 md:space-y-10">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-[#f7ab0a] w-5 h-5 md:h-7 md:w-7 animate-pulse" />
            <p className="text-[1rem] tracking-widest md:text-2xl">
              +48 123 456 789
            </p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-[#f7ab0a]  w-5 h-5 md:h-7 md:w-7 animate-pulse" />
            <p className="text-[1rem] tracking-widest md:text-2xl">
              kontakt@XXX.com
            </p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-[#f7ab0a]  w-5 h-5 md:h-7 md:w-7 animate-pulse" />
            <p className="text-[1rem] tracking-widest md:text-2xl">XXX, XXX</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 w-[100%] md:w-fit mx-auto"
        >
          <div className="flex space-x-2">
            <input
              placeholder="Imię"
              className="contactInput"
              type="text"
              id="name"
              value={name}
              name="Name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              placeholder="Email"
              className="contactInput"
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <input
            placeholder="Temat"
            className="contactInput"
            type="text"
            id="subject"
            value={subject}
            name="Subject"
            onChange={(event) => setSubject(event.target.value)}
          />
          <textarea
            placeholder="Wiadomość"
            id="message"
            value={message}
            name="message"
            onChange={(event) => setMessage(event.target.value)}
            className="contactInput resize-none h-[100px] md:h-[150px] scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#f7ab0a]/80"
          />
          {errorMessage ? <p className="text-red-500">{errorMessage}</p> : ""}
          <button
            type="submit"
            disabled={sendingForm || formIsSent}
            className={`bg-[#f7ab0a] py-2 md:py-3 px-10 rounded-md text-black font-semibold text-base ${
              sendingForm ? "bg-gray-400 cursor-not-allowed" : ""
            } ${error ? "bg-red-700 cursor-not-allowed" : ""} ${
              formIsSent ? "bg-green-400" : ""
            }`}
          >
            {sendingForm
              ? "Wysyłam..."
              : error
              ? "Error"
              : formIsSent
              ? "Wysłano"
              : "Wyślij"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
