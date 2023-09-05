import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginfirst = () => {
  const navigate = useNavigate();
  const f = async () => {
    navigate("/home");
    alert("Please Login first");
  };
  return f();
};

export default Loginfirst;