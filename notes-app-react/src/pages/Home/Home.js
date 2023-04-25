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
import { AuthContext, AuthProvider } from "../../Auth";
import Notes from "../Notes/Notes";



const Home = () => {

  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem(email));

    if (userFromLocalStorage && userFromLocalStorage.password === password) {
      const { name, email, notes } = userFromLocalStorage;
      setUser({ name, email, notes: notes || [] }); // Atualiza o estado do user com as notas do local storage
      return null;
    }

    return "Usuário ou senha inválidos";
  };
  const { signout } = useAuth();
  const navigate = useNavigate();

  

  return (
    
    <Notes/>
    
  );
};

export default Home;