import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Label,
  Fieldset,
  Input,
  Form,
  Titulo,
  ErrorMessage,
} from "../../components";
import InputMask from "../../components/InputMask";

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

const confirmPassword = (confirmPassword: string, { password }: FormData) => {
  return confirmPassword === password || "As senhas devem ser iguais";
};

const CadastroPessoal = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const hasErrors = !!Object.keys(errors).length;

  const handleValid = (data: FormData) => {
    console.log(data);
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
            $error={!!errors.name}
            {...register("name", {
              required: "Campo de nome é obrigatório",
              minLength: {
                value: 5,
                message: "O nome deve ter no mínimo cinco caracteres",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-email">E-mail</Label>
          <Input
            id="campo-email"
            placeholder="Insira seu endereço de email"
            type="email"
            $error={!!errors.email}
            {...register("email", {
              required: "Campo de email é obrigatório",
              pattern: {
                value: emailPattern,
                message: "O email deve ter o domínio @alura.com.br",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label>Telefone</Label>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Campo de telefone é obrigatório",
              pattern: {
                value: phonePattern,
                message: "O formato de telefone está incorreto",
              },
            }}
            render={({ field }) => (
              <InputMask
                mask="(99) 99999-9999"
                id="campo-telefone"
                type="text"
                placeholder="Ex: (DDD) XXXXX-XXXX"
                $error={!!errors.phone}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha">Crie uma senha</Label>
          <Input
            id="campo-senha"
            placeholder="Crie uma senha"
            type="password"
            $error={!!errors.password}
            {...register("password", {
              required: "Campo de senha é obrigatório",
              pattern: {
                value: passwordPattern,
                message: "Formato de senha incorreto",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-senha-confirmacao">Repita a senha</Label>
          <Input
            id="campo-senha-confirmacao"
            placeholder="Repita a senha anterior"
            type="password"
            $error={!!errors.confirmedPassword}
            {...register("confirmedPassword", {
              required: "Campo de confirmação de senha é obrigatório",
              validate: confirmPassword,
            })}
          />
          {errors.confirmedPassword && (
            <ErrorMessage>{errors.confirmedPassword.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button disabled={hasErrors} type="submit">
          Avançar
        </Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
