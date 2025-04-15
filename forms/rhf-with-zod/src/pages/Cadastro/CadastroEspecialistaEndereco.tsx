import { z } from "zod";
import {
  Button,
  Divisor,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
  UploadDescription,
  UploadIcon,
  UploadInput,
  UploadLabel,
  UploadTitulo,
} from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";

const especialistaEnderecoSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .nullable()
    .transform((list) => list?.item(0)),
  endereco: z.object({
    cep: z
      .string()
      .min(1, "Este campo é obrigatório")
      .length(8, "Informe um CEP válido"),
    rua: z.string().min(1, "Este campo é obrigatório"),
    numero: z.coerce
      .number({
        invalid_type_error: "Este campo é numérico",
      })
      .min(1, "Este campo é obrigatório"),
    bairro: z.string().min(1, "Este campo é obrigatório"),
    localidade: z.string().min(1, "Este campo é obrigatório"),
  }),
});

type TFieldValues = z.input<typeof especialistaEnderecoSchema>;
type TTransformedValues = z.output<typeof especialistaEnderecoSchema>;

const validateCep = (cep: string) =>
  especialistaEnderecoSchema.shape.endereco.shape.cep.safeParse(cep).success;

async function fethEndereco(
  cep: string,
  callback: (data: {
    logradouro: string;
    localidade: string;
    uf: string;
    bairro: string;
  }) => void
) {
  if (!cep) return;
  const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();

  if (response.ok) {
    callback(data);
  } else {
    throw new Error();
  }
}

const CadastroEspecialistaEndereco = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TFieldValues, unknown, TTransformedValues>({
    resolver: zodResolver(especialistaEnderecoSchema),
    defaultValues: {
      avatar: null,
      endereco: {
        bairro: "",
        cep: "",
        localidade: "",
        numero: 0,
        rua: "",
      },
    },
  });

  const handleSetEndereco = useCallback(
    async (cep: string) => {
      if (!cep) return;
      try {
        fethEndereco(cep, (data) => {
          setValue("endereco.rua", data.logradouro);
          setValue("endereco.localidade", `${data.localidade}, ${data.uf}`);
          setValue("endereco.bairro", data.bairro);
        });
      } catch (error) {
        setError("endereco.cep", {
          type: "manual",
          message: "CEP inválido",
        });
      }
    },
    [setError, setValue]
  );

  const cep = watch("endereco.cep");

  useEffect(() => {
    if (validateCep(cep)) {
      handleSetEndereco(cep);
    }
  }, [cep, handleSetEndereco]);

  const handleValid = (data: TTransformedValues) => {
    console.log(data);
  };

  return (
    <>
      <Titulo className="titulo">Para finalizar, só alguns detalhes!</Titulo>
      <Form onSubmit={handleSubmit(handleValid)}>
        <>
          <UploadTitulo>Sua foto</UploadTitulo>
          <UploadLabel htmlFor="campo-upload">
            <UploadIcon />
            <UploadDescription>Clique para enviar</UploadDescription>
            <UploadInput
              accept="image/*"
              id="campo-upload"
              type="file"
              multiple={false}
              {...register("avatar")}
            />
            {errors.avatar && (
              <ErrorMessage>{errors.avatar.message}</ErrorMessage>
            )}
          </UploadLabel>
        </>

        <Divisor />
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input
            id="campo-cep"
            placeholder="Insira seu CEP"
            type="text"
            $error={!!errors.endereco?.cep}
            {...register("endereco.cep", {
              onBlur: () => handleSetEndereco(cep),
            })}
          />
          {errors.endereco?.cep && (
            <ErrorMessage>{errors.endereco.cep.message}</ErrorMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input
            id="campo-rua"
            placeholder="Rua Agarikov"
            type="text"
            $error={!!errors.endereco?.rua}
            {...register("endereco.rua")}
          />
          {errors.endereco?.rua && (
            <ErrorMessage>{errors.endereco.rua.message}</ErrorMessage>
          )}
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input
              id="campo-numero-rua"
              placeholder="Ex: 1440"
              type="text"
              $error={!!errors.endereco?.numero}
              {...register("endereco.numero")}
            />
            {errors.endereco?.numero && (
              <ErrorMessage>{errors.endereco.numero.message}</ErrorMessage>
            )}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input
              id="campo-bairro"
              placeholder="Vila Mariana"
              type="text"
              $error={!!errors.endereco?.bairro}
              {...register("endereco.bairro")}
            />
            {errors.endereco?.bairro && (
              <ErrorMessage>{errors.endereco.bairro.message}</ErrorMessage>
            )}
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            $error={!!errors.endereco?.localidade}
            {...register("endereco.localidade")}
          />
          {errors.endereco?.localidade && (
            <ErrorMessage>{errors.endereco.localidade.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEspecialistaEndereco;
