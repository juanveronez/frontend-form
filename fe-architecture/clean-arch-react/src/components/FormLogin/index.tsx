import { useState } from "react";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
import { Figure, Form, FormActions, Heading, Image } from "../Form";
import { FormLabel } from "../FormLabel";
import { TextField } from "../TextField";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { toast } from "react-toastify";

export const FormLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { login } = useAuthContext();

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
      setCredentials({ email: "", password: "" });
    } catch (error) {
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
