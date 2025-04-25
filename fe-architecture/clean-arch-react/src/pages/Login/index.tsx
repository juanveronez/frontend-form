import { useState } from "react";
import { Button } from "../../components/Button";
import { Fieldset } from "../../components/Fieldset";
import { Figure, Form, FormActions, Heading, Image } from "../../components/Form";
import { FormLabel } from "../../components/FormLabel";
import { TextField } from "../../components/TextField";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const loginUser = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { email, password } = credentials;

    try {
      await login(email, password);
      toast.success("Que bom te ter de volta ao Anybank!");
      navigate("/");
    } catch (error) {
      toast.error("Falha ao realizar login, credenciais inválidas");
      console.error("login", error);
    }
  };

  return (
    <>
      <Figure>
        <Image src="/imgs/login.png" />
      </Figure>
      <div>
        <Heading>Login</Heading>
        <p>Preencha os dados do login.</p>
        <Form onSubmit={loginUser}>
          <Fieldset>
            <FormLabel>Email</FormLabel>
            <TextField
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <Fieldset>
            <FormLabel>Senha</FormLabel>
            <TextField
              name="password"
              type="password"
              placeholder="Digite sua senha"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <FormActions>
            <Button type="submit">Efetuar login</Button>
          </FormActions>
        </Form>
      </div>
    </>
  );
};

export default Login;
