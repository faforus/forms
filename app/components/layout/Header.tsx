import React from "react";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="flex items-center justify-evenly md:justify-around h-10 w-full bg-slate-100">
      <div className="flex flex-row justify-center items-start">
        <p className="ml-2 hidden md:block ">XXX</p>
      </div>
      <ul className="flex space-x-4 list-none">
        <li>
          <Link className="navButton" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navButton" href="/faq">
            FAQ
          </Link>
        </li>
        <li>
          <Link className="navButton" href="/kontakt">
            Kontakt
          </Link>
        </li>
        <li>
          <Link className="navButton" href="/panel-agenta">
            Panel Agenta
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
