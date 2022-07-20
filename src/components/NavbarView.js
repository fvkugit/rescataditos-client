import React from "react";
import { FaPrint, FaEdit, FaArrowLeft } from "react-icons/fa";
import HeaderLogo from "./home/HeaderLogo";
import { Link } from 'react-router-dom'
function NavbarView() {
  return (
    <>
      <div className="icon-code d-flex justify-content-between">
        <Link className="text-link" to="/lista"><i className="ms-3"><FaArrowLeft /></i></Link>
        <div>
        <Link className="text-link" to="/"><i className="me-3"><FaPrint /></i></Link>
        <Link className="text-link" to="/"><i className="me-3"><FaEdit /></i></Link>
        </div>
      </div>
      <HeaderLogo />
    </>
  );
}

export default NavbarView;
