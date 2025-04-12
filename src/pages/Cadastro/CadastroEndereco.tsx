import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from "../../components";
import InputMask from "../../components/InputMask";
import { useEffect } from "react";

interface AddressResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface FormData {
  code: string;
  street: string;
  number: number;
  neighborhood: string;
  location: string;
}

const codePattern = /^\d{5}-\d{3}$/;
const numberPattern = /^\d+$/;

const CadastroEndereco = () => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);

  const handleValid = (data: FormData) => {
    console.log(data);
  };

  const fetchAddress = async (code: string) => {
    if (!code || !codePattern.test(code)) return;
    try {
      const res = await fetch(
        `http://viacep.com.br/ws/${code.replace("-", "")}/json/`
      );
      if (!res.ok) throw new Error();

      const data: AddressResponse = await res.json();

      setValue("street", data.logradouro, { shouldValidate: true });
      setValue("location", `${data.localidade}, ${data.uf}`, {
        shouldValidate: true,
      });
      setValue("neighborhood", data.bairro, { shouldValidate: true });
    } catch (e) {
      setError("code", { type: "deps", message: "CEP inválido" });
    }
  };

  const hasErrors = !!Object.keys(errors).length;

  const codeValue = watch("code");

  return (
    <>
      <Titulo>Agora, mais alguns dados sobre você:</Titulo>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Controller
            control={control}
            name="code"
            defaultValue=""
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: codePattern,
                message: "Formato de CEP inválido",
              },
            }}
            render={({ field }) => (
              <InputMask
                mask="99999-999"
                id="campo-cep"
                placeholder="Insira seu CEP"
                type="text"
                $error={!!errors.code}
                value={field.value}
                onChange={field.onChange}
                onBlur={() => fetchAddress(codeValue)}
              />
            )}
          />
          {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input
            id="campo-rua"
            placeholder="Rua Agarikov"
            type="text"
            $error={!!errors.street}
            {...register("street", { required: "Campo obrigatório" })}
          />
          {errors.street && (
            <ErrorMessage>{errors.street.message}</ErrorMessage>
          )}
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input
              id="campo-numero-rua"
              placeholder="Ex: 1440"
              type="text"
              $error={!!errors.number}
              {...register("number", {
                required: "Campo obrigatório",
                pattern: {
                  value: numberPattern,
                  message: "O campo deve ser numérico",
                },
              })}
            />
            {errors.number && (
              <ErrorMessage>{errors.number.message}</ErrorMessage>
            )}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input
              id="campo-bairro"
              placeholder="Vila Mariana"
              type="text"
              $error={!!errors.neighborhood}
              {...register("neighborhood", { required: "Campo obrigatório" })}
            />
            {errors.neighborhood && (
              <ErrorMessage>{errors.neighborhood.message}</ErrorMessage>
            )}
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            $error={!!errors.location}
            {...register("location", { required: "Campo obrigatório" })}
          />
          {errors.location && (
            <ErrorMessage>{errors.location.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button disabled={hasErrors} type="submit">
          Cadastrar
        </Button>
      </Form>
    </>
  );
};

export default CadastroEndereco;
