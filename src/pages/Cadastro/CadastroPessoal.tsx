import { useForm } from "react-hook-form";
import { Button, Label, Fieldset, Input, Form, Titulo } from "../../components";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmedPassword: string;
}

const phonePattern = /^\(\d{2,3}\) \d{5}-\d{4}$/;
const emailPattern = /^[^\s@]+@alura\.com\.br$/;
const passwordPattern =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const CadastroPessoal = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const handleValid = (data: FormData) => {
    console.log(data);
  };

  const confirmPassword = (confirmPassword: string, { password }: FormData) => {
    return confirmPassword === password;
  };

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Fieldset>
          <Label htmlFor="campo-nome">Nome</Label>
          <Input
            id="campo-nome"
            placeholder="Digite seu nome completo"
            type="text"
            {...register("name", { required: true, minLength: 5 })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            {...register("email", { required: true, pattern: emailPattern })}
          />
        </Fieldset>

        <Fieldset>
          <Label>Telefone</Label>
          <Input
            id="campo-telefone"
            type="text"
            placeholder="Ex: (DDD) XXXXX-XXXX"
            {...register("phone", {
              required: true,
              pattern: phonePattern,
            })}
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            {...register("password", {
              required: true,
              pattern: passwordPattern,
            })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            {...register("confirmedPassword", { validate: confirmPassword })}
          />
        </Fieldset>
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
