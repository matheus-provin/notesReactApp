import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "../../App.css";
import Main from "../../Main";
import Sidebar from "../../Sidebar";
import RoutesC from "../../routes/RoutesC";
import { AuthProvider } from "../../Auth";
import Notes from "../Notes/Notes";



const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  

  return (
    <Notes/>
  );
};

export default Home;