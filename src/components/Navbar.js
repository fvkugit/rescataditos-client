import React from "react";
import { FaKey, FaArrowLeft } from "react-icons/fa";
import HeaderLogo from "./home/HeaderLogo";
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <>
      <div className="icon-code d-flex justify-content-between">
        <Link className="text-link" to="/"><i className="ms-3"><FaArrowLeft /></i></Link>
        <Link className="text-link" to="/codigo"><i className="me-3"><FaKey /></i></Link>
      </div>
      <HeaderLogo />
    </>
  );
}

export default Navbar;
