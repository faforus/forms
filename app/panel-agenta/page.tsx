"use client";
import React, { Fragment, useState } from "react";
import AgentRegister from "../components/AgentPanel/AgentRegister";

function AgentPanel() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [sendingForm, setSendingForm] = useState(false);
  const [formIsSent, setFormIsSent] = useState(false);
  const [error, setError] = useState(false);
  const [agentRegister, setAgentRegister] = useState(false);
  const [agentLoggedIn, setAgentLoggedIn] = useState(false);

  const submitHandler = () => {
    setAgentLoggedIn(true);
  };

  return (
    <Fragment>
      {!agentLoggedIn && !agentRegister && (
        <div className="flex relative overflow-hidden flex-col text-left md:flex-row max-w-7x px-10 justify-evenly mx-auto items-center">
          <div className="flex flex-col space-y-10">
            <div className="space-y-2 md:space-y-10">
              <div className="flex items-center space-x-5 justify-center">
                <p className="text-[1rem] tracking-widest md:text-2xl">
                  Panel XXX
                </p>
              </div>
            </div>
            <form
              onSubmit={submitHandler}
              className="flex flex-col space-y-2 md:w-fit mx-auto"
            >
              <input
                placeholder="login"
                className="contactInput w-[300px]"
                type="text"
                id="login"
                value={login}
                name="login"
                onChange={(event) => setLogin(event.target.value)}
              />
              <input
                placeholder="hasło"
                className="contactInput w-[300px]"
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
              />
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
                  ? "Loguję..."
                  : error
                  ? "Error"
                  : formIsSent
                  ? "Wysłano"
                  : "Zaloguj się"}
              </button>
              <button
                className={`bg-[#f7ab0a] py-2 md:py-3 px-10 rounded-md text-black font-semibold text-base `}
                onClick={(e) => {
                  e.preventDefault();
                  setAgentRegister(true);
                }}
              >
                Zarejestruj się
              </button>
            </form>
          </div>
        </div>
      )}
      {agentLoggedIn && <div>logged in</div>}
      {agentRegister && <AgentRegister setAgentRegister={setAgentRegister} />}
    </Fragment>
  );
}

export default AgentPanel;
