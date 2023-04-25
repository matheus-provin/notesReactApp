import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AuthContext, AuthProvider } from "../../Auth";

const Signin = () => {
  const { user, setUserNotes, signin } = useContext(AuthContext);
 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { notes: userNotes = [] } = user ?? {};
 
  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }
    
    if (user && user.email) {
      const userNotes = JSON.parse(localStorage.getItem(`${user.email}_notes`)) || [];
      setUserNotes(userNotes);
    }
  
    navigate("/home");
    
    
  };

  return (
    <AuthProvider>
      <C.Container>
        <C.Label>SISTEMA DE LOGIN</C.Label>
        <C.Content>
          <Input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <Input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Entrar" onClick={handleLogin} />
          <C.LabelSignup>
            Não tem uma conta?
            <C.Strong>
              <Link to="/signup">&nbsp;Registre-se</Link>
            </C.Strong>
          </C.LabelSignup>
        </C.Content>
      </C.Container>
    </AuthProvider>
  );
};

export default Signin;